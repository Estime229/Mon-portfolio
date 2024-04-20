import { useAuth } from "@/context/AuthUserContext";
import { useToogle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container/container";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typography } from "@/ui/design-system/typography/typography";
import { UploadAvatar } from "@/ui/components/upload-avatar/upload-avatar";
import { useState } from "react";
import { StorageReference, UploadTask, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/config/firebase-config";
import { error } from "console";
import { toast } from "react-toastify";
import { firestoreUpdateDocment } from "@/api/firestore";





export const AvatarStep = ({
    next, isFinalStep, prev, stepList, getCurrentStep
}: BaseComponentProps) => {
    const { authUser } = useAuth();
    const { value: isLoading, toggle } = useToogle();

const [selectedImage,setSelectedImage] = useState <File |null>(null);
const [imagePreview,setImagePreview]= useState<string | ArrayBuffer | null>(null);

const [uploadProgress, setUploadProgress] = useState <number>(0);


const handleImageSelect = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const file = e.target.files?.[0];
if(file){
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e)=>{
        let imgDataUrl: string | ArrayBuffer | null = null;
        if (e.target) {
            imgDataUrl = e.target.result;
        }
        setImagePreview(imgDataUrl);
    };
    reader.readAsDataURL(file);
}



}

const updateUserDocument = async (photoURL:string) => {
    const body ={
        photoURL: photoURL
    };
    // await updateUserIdentificationData(authUser.uid,body);
    const {error} =await firestoreUpdateDocment (
        "users",
        authUser.uid,
        body
    );
    if(error) {
        toggle();
        toast.error(error.message);
        return;
    }
    toggle();
    next();
}



const handleImageUpload= ()  => {
 let storageRef: StorageReference;
 let uploadTask: UploadTask;


 if(selectedImage !== null) {
    toggle()
    storageRef = ref(
        storage,
        `users-medias/${authUser.uid}/avatar/avatar-${authUser.uid}`
    );
    uploadTask = uploadBytesResumable(storageRef, selectedImage);
    uploadTask.on(
        "state_changed", (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
             setUploadProgress(progress)
        },
        (error)=> {
            console.log('error', error);
            toggle();
            toast.error("une erreur inconnue est survenue")
        },
        ()  => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) =>{
                    updateUserDocument(downloadURL);
                    //  console.log(":: downloadURL :: ", downloadURL)
                }
            );
        }
    );
 } else{
    next();
 }
}

 return(
    <div className="relative h-screen pb-[91px]">
            <div className="h-full overflow-auto">
                < Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs
                                tabs={stepList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typography variant="h1" component="h1">
                                Dernière étape
                            </Typography>
                            <Typography variant="body-base" component="p" theme="gray">
                            Dis-nous tout sur toi. Remplis notre formulaire de présentation pour quon puisse mieux te connaître. On veut savoir qui tu es, ce que tu fais et comment tu as atteint ici. Plus on en saura sur toi, mieux on pourra personnaliser ton expérience sur notre plateforme.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="flex justify-center w-full ">
                     
                        <UploadAvatar 
                        handleImageSelect={handleImageSelect}
                        
                        imagePreview={imagePreview}
                        uploadProgress={uploadProgress}
                        isLoading={isLoading}
                        />
                       
                        </div>
                    </div>

                </Container>
            </div>
            <OnboardingFooter
                prev={prev}
                next={handleImageUpload}
        
                isFinalStep={isFinalStep}
                isLoading={isLoading}
            />
        </div>


 );
}