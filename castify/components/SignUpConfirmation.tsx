import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
}

export const SignUpConfirmation = ({ isOpen, closeDialog }: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="flex flex-col items-center lg:gap-4 max-w-[20rem] lg:max-w-[22rem] rounded-md">
        <Image
          src="/assets/check-mail.png"
          alt="Mail check icon"
          height={128}
          width={128}
          sizes="(min-width: 1024px) 80px, 64px"
          quality={100}
          className="h-[4rem] w-[4rem] lg:h-[5rem] lg:w-[5rem]"
        />
        <AlertDialogTitle>Email Confirmation</AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          We have sent a confirmation email to your email address. Please click
          on the confirmation link to activate your account.
        </AlertDialogDescription>
        <AlertDialogCancel onClick={closeDialog} className="w-full">
          Got it
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
