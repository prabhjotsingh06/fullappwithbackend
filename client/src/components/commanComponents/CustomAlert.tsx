import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent } from "../ui/alert-dialog";
const CustomAlert = ({ title, description }: { title: string; description: string }) => {
  const [openAlert, setOpenAlert] = useState<true | false>(true);
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
            setOpenAlert(false);
          }}>
          cancle
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
