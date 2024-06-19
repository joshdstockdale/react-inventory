import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TInventoryUpdate, saveInventoryDetail } from "./api/inventory";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import useInventory from "./lib/useInventory";

const formSchema = z.object({
  company: z
    .string({
      required_error: "Company is required.",
    })
    .trim()
    .min(1, { message: "Company is required." }),
  date: z
    .string({
      required_error: "Date is required.",
    })
    .min(1, { message: "Date is required." }),
  amount: z
    .string({
      required_error: "Amount is required.",
    })
    .min(1, { message: "Amount is required." }),
  status: z
    .string({
      required_error: "Please select a status.",
    })
    .min(1, { message: "Please select a status." }),
});

export default function InventoryDetail() {
  const { id } = useParams();
  const [detail] = useInventory(id);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: detail,
  });
  const { handleSubmit, reset } = form;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (detail) {
      reset(detail);
    }
  }, [reset, detail]);

  const update = useMutation({
    mutationFn: (formData: TInventoryUpdate) => saveInventoryDetail(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      navigate("/");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    update.mutate({ data: values, id: id });
  }

  return (
    <Dialog open={true} onOpenChange={() => navigate("/")}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in process">in progress</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
