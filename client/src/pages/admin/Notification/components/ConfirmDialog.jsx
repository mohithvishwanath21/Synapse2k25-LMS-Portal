import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; // Add this
import { Label } from "@/components/ui/label"; // Add this
import { toast } from "sonner";

export default function ConfirmDialog({ 
  btnName, 
  btnClass, 
  id, 
  action, 
  input, // NEW: For specifying approve/reject action
  refetchData, 
  description='',
  title = ''
}) {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (id, reason) => {
    const toastId = toast.loading("Please wait . . .");
    setIsLoading(true);
    try {
      // Determine the action input
      const actionInput = input || btnName.toLowerCase();
      
      // Always use the same format: { id, input, reason }
      const actionData = { id, input: actionInput, reason };

      const result = action(actionData);
      const response = typeof result?.unwrap === "function" ? await result.unwrap() : await result;
      toast.success(response?.message || "Action completed successfully", { id: toastId });
      refetchData?.();
      setReason('');
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "Error processing request", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if this is a reject action (needs required reason)
  const isRejectAction = input === 'reject' || btnName.toLowerCase() === 'reject';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          className={btnClass} 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : btnName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : `Confirm ${btnName}`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ? description : "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {/* Reason Input Section */}
        <div className="space-y-3">
          <Label htmlFor="reason">
            Reason {isRejectAction ? '(Required)' : '(Optional)'}
          </Label>
          <Textarea
            id="reason"
            placeholder={
              isRejectAction 
                ? "Please provide a reason for rejection..." 
                : "Enter reason if any..."
            }
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
            required={isRejectAction}
          />
          {isRejectAction && !reason.trim() && (
            <p className="text-sm text-red-500">Reason is required for rejection</p>
          )}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className={`${btnClass} ${isRejectAction ? 'bg-red-500 hover:bg-red-600' : ''}`}
            onClick={() => handleAction(id, reason)}
            disabled={isLoading || (isRejectAction && !reason.trim())}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}