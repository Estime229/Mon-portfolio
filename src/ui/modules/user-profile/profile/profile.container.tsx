import { firebaseLogoutUser } from "@/api/authentication";
import { Button } from "@/ui/design-system/button/button";
import { toast } from "react-toastify";
import { ProfileView } from "./profile.view";
import { useAuth } from "@/context/AuthUserContext";
import { useToogle } from "@/hooks/use-toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfileFormFielsType } from "@/types/forms";
import { useEffect, useState } from "react";
import { firestoreUpdateDocment } from "@/api/firestore";
import { StorageReference, UploadTask, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase-config";

export const ProfileContainer = () => {
    const { authUser, reloadAuthUserData } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToogle();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setValue,
        setError,
    } = useForm<UserProfileFormFielsType>();

    const { displayName, expertise, biography, linkediin, github } = authUser.userDocument;

    useEffect(() => {
        const fieldsToUpdate: (
            | "displayName"
            | "expertise"
            | "biography"
            | "linkediin"
            | "github"
        )[] = ["displayName", "biography", "expertise", "linkediin", "github"];

        for (const field of fieldsToUpdate) {
            setValue(field, authUser.userDocument[field]);
        }
    }, [authUser.userDocument, setValue]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                let imgDataUrl: string | ArrayBuffer | null = null;
                if (e.target) {
                    imgDataUrl = e.target.result;
                }
                setImagePreview(imgDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        let storageRef: StorageReference;
        let uploadTask: UploadTask;

        if (selectedImage !== null) {
            setLoading(true);
            storageRef = ref(
                storage,
                `users-medias/${authUser.uid}/avatar/avatar-${authUser.uid}`
            );
            uploadTask = uploadBytesResumable(storageRef, selectedImage);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.log('error', error);
                    setLoading(false);
                    toast.error("Une erreur inconnue est survenue");
                    setUploadProgress(0);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateUserAvatar(downloadURL);
                        setSelectedImage(null);
                        setTimeout(() => {
                            setUploadProgress(0);
                        }, 1000);
                    });
                }
            );
        }
    };

    const updateUserAvatar = async (photoURL: string) => {
        const body = {
            photoURL: photoURL,
        };

        const { error } = await firestoreUpdateDocment("users", authUser.uid, body);

        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        reloadAuthUserData();
        setLoading(false);
    };

    const handleUpdateUserDocument = async (FormData: UserProfileFormFielsType) => {
        setLoading(true);
        const { error } = await firestoreUpdateDocment("users", authUser.uid, FormData);
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        toast.success("Ton profil a été mis à jour avec succès");
        setLoading(false);
    };

    const onSubmit: SubmitHandler<UserProfileFormFielsType> = async (FormData) => {
        if (selectedImage) {
            handleImageUpload();
        }

        if (FormData.linkediin && !FormData.linkediin.includes("linkedin.com/")) {
            setError("linkediin", {
                type: "manual",
                message: "Cet URL ne correspond pas à un profil LinkedIn",
            });
            return;
        }

        if (FormData.github && !FormData.github.includes("github.com/")) {
            setError("github", {
                type: "manual",
                message: "Cet URL ne correspond pas à un profil GitHub",
            });
            return;
        }

        if (
            displayName !== FormData.displayName ||
            expertise !== FormData.expertise ||
            biography !== FormData.biography ||
            linkediin !== FormData.linkediin ||
            github !== FormData.github
        ) {
            if (displayName !== FormData.displayName || authUser.displayName !== FormData.displayName) {
                const body = {
                    displayName: FormData.displayName,
                };

                const { error } = await firestoreUpdateDocment("users", authUser.uid, body);

                if (error) {
                    setLoading(false);
                    toast.error(error.message);
                    return;
                }
                reloadAuthUserData();
            }

            for (const key in FormData) {
                if (FormData.hasOwnProperty(key) && FormData[key as keyof UserProfileFormFielsType] === undefined) {
                    delete FormData[key as keyof UserProfileFormFielsType];
                }
            }

            handleUpdateUserDocument(FormData);
            return;
        }
    };

    return (
        <>
            <ProfileView
                imagePreview={imagePreview}
                uploadProgress={uploadProgress}
                handleImageSelect={handleImageSelect}
                form={{
                    errors,
                    control,
                    register,
                    handleSubmit,
                    isLoading,
                }}
            />
        </>
    );
};
