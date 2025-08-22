import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/Tour/tour.api";

import { Trash2 } from "lucide-react";
import { AddTourModal } from "@/components/modules/Admin/Tour/AddTourTypeModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";

const AddTourType = () => {
  const { data, isLoading, isError } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleDeleteTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing......");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Tour Type Removed Successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-6 text-destructive">
        Failed to load tour types.
      </p>
    );

  return (
    <div className="w-full max-w-5xl mx-auto lg:px-10 px-4">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourModal />
      </div>
      <div className="border border-muted rounded-2xl shadow-md overflow-hidden">
        <Table>
          <TableCaption className="text-muted-foreground text-sm py-3">
            A list of Tour Types
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[100px] font-semibold text-foreground">
                #
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Name
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: { _id: string; name: string }, index: number) => (
              <TableRow
                key={item._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {item.name}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation
                    onConfirm={() => handleDeleteTourType(item._id)}
                  >
                    <button className="p-2 rounded-full hover:bg-destructive/10 transition">
                      <Trash2 className="text-destructive w-5 h-5" />
                    </button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
