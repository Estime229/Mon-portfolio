import { BaseComponentProps } from "@/types/onboarding-steps-list";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container/container";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typography } from "@/ui/design-system/typography/typography";
import { ProfileStepForm } from "./profil-step-form";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { OnboardingProfileFormFielsType } from "@/types/forms";
import { useAuth } from "@/context/AuthUserContext";
import { useToogle } from "@/hooks/use-toggle";
import { useEffect } from "react";
import { firestoreUpdateDocment } from "@/api/firestore";
import { toast } from "react-toastify";

export const ProfileStep = ({
    next,
    isFirstStep,
    isFinalStep,
    prev,
    stepList,
    getCurrentStep,
}: BaseComponentProps) => {
    const { authUser } = useAuth();
    const { value: isLoading, setValue: setLoading } = useToogle();

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        reset,
        setValue,
    } = useForm<OnboardingProfileFormFielsType>();

    const { displayName, expertise, biography } = authUser.userDocument;

    useEffect(() => {
        const fieldsToUpdate: ("displayName" | "expertise" | "biography")[] = [
            "biography",
            "displayName",
            "expertise",
        ];

        for (const field of fieldsToUpdate) {
            setValue(field, authUser.userDocument[field]);
        }
    }, [authUser.userDocument, setValue]);

    const handleUpdateUserDocument = async (FormData: OnboardingProfileFormFielsType) => {
        const { error } = await firestoreUpdateDocment("users", authUser.uid, FormData);
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }

        setLoading(false);
        reset();
        next();
    };

    const onSubmit: SubmitHandler<OnboardingProfileFormFielsType> = async (FormData) => {
        setLoading(true);

        if (
            displayName !== FormData.displayName ||
            expertise !== FormData.expertise ||
            biography !== FormData.biography
        ) {
            handleUpdateUserDocument(FormData);
        } else {
            next();
        }
    };

    return (
        <div className="relative h-screen pb-[91px]">
            <div className="h-full overflow-auto">
                <Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs tabs={stepList} getCurrentStep={getCurrentStep} />
                            <Typography variant="h1" component="h1">
                                Présente toi
                            </Typography>
                            <Typography variant="body-base" component="p" theme="gray">
                            Dis nous tout sur toi. Remplis notre formulaire de présentation pour qu&apos;on puisse mieux te connaître. On veut savoir qui tu es, ce que tu fais et comment tu as atteint ici. Plus on en saura sur toi, mieux on pourra personnaliser ton expérience sur notre plateforme.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="flex justify-end w-full">
                            <ProfileStepForm
                                form={{
                                    errors,
                                    control,
                                    register,
                                    handleSubmit,
                                    onSubmit,
                                    isLoading,
                                }}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <OnboardingFooter
                prev={prev}
                next={handleSubmit(onSubmit)}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
                isLoading={isLoading}
            />
        </div>
    );
};