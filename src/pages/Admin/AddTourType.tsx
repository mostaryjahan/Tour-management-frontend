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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetTourTypesQuery({
    page: currentPage,
    limit,
  });

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

  const totalPage = data?.meta?.totalPage || 1;

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
        {/* pagination */}
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                className={currentPage ===1 ? "pointer-events-none opacity-60" : "cursor-pointer"}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                className={currentPage === totalPage ? "pointer-events-none opacity-60" : "cursor-pointer"}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AddTourType;
