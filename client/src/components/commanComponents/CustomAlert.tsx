import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent } from "../ui/alert-dialog";
const CustomAlert = ({ openAlert, title, description , onClick }: { openAlert: true | false; title: string; description: string ; onClick:()=>void}) => {
  
  return (
    <AlertDialog open={openAlert}>
      <AlertDialogContent>
        <Alert className="max-w-md">
          <CheckCircle2Icon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>

        <AlertDialogCancel
          onClick={() => {
            onClick();
          }}>
          cancle
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
