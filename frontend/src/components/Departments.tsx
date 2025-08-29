import React, { useState } from "react";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../store/api/departmentApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Edit, Plus } from "lucide-react";

const Departments: React.FC = () => {
  const { data, isLoading, refetch } = useGetDepartmentsQuery();
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const [editDept, setEditDept] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<any | null>(null);

  if (isLoading) return <p>Loading departments...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editDept.id) {
        await updateDepartment({
          id: editDept.id,
          body: {
            name: editDept.name,
            description: editDept.description,
            isActive: editDept.isActive,
          },
        }).unwrap();
      } else {
        await createDepartment({
          name: editDept.name,
          description: editDept.description,
          isActive: editDept.isActive,
        }).unwrap();
      }
      setIsDialogOpen(false);
      setEditDept(null);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deptToDelete) return;
    try {
      await deleteDepartment({ id: deptToDelete.id }).unwrap();
      setIsDeleteDialogOpen(false);
      setDeptToDelete(null);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {/* Empty div to push the Add button to the right */}
        <div />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
              aria-label="Add Department"
              onClick={() => {
                setEditDept({ name: "", description: "", isActive: true });
                setIsDialogOpen(true);
              }}
            >
              <Plus className="h-5 w-5" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md sm:max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editDept?.id ? "Edit Department" : "Add Department"}
              </DialogTitle>
              <DialogDescription className="mb-4 text-muted-foreground">
                Fill in the details for the department below.
              </DialogDescription>
            </DialogHeader>
            {editDept && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="dept-name" className="block mb-1 font-medium">
                    Department Name *
                  </label>
                  <Input
                    id="dept-name"
                    placeholder="Enter department name"
                    value={editDept.name}
                    onChange={(e) =>
                      setEditDept({ ...editDept, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dept-desc" className="block mb-1 font-medium">
                    Description
                  </label>
                  <Input
                    id="dept-desc"
                    placeholder="Enter description (optional)"
                    value={editDept.description || ""}
                    onChange={(e) =>
                      setEditDept({ ...editDept, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="dept-active"
                    checked={editDept.isActive}
                    onCheckedChange={(checked) =>
                      setEditDept({ ...editDept, isActive: checked })
                    }
                    aria-checked={editDept.isActive}
                  />
                  <label htmlFor="dept-active" className="font-medium">
                    Active
                  </label>
                </div>
                <div className="flex justify-end gap-3">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isCreating || isUpdating}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex items-center gap-2"
                  >
                    {isCreating || isUpdating ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Table className="border rounded-md overflow-hidden shadow-sm">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/2">Description</TableHead>
            <TableHead className="w-1/6">Active</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {data?.departments.map((dept) => (
            <TableRow
              key={dept.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell className="font-medium">{dept.name}</TableCell>
              <TableCell>{dept.description || "No description"}</TableCell>
              <TableCell>{dept.isActive ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right space-x-2 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  aria-label={`Edit Department ${dept.name}`}
                  onClick={() => {
                    setEditDept(dept);
                    setIsDialogOpen(true);
                  }}
                  className="inline-flex items-center p-2"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  aria-label={`Delete Department ${dept.name}`}
                  onClick={() => {
                    setDeptToDelete(dept);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="inline-flex items-center p-2"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirm Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm p-6">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete department{" "}
              <strong>{deptToDelete?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Departments;
