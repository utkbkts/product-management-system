import { Team } from "@/app/team/page";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  approveTeamMember,
  blockTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/server/actions/team-action";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

interface TeamCardProps {
  member: Team;
  isPending: boolean;
  role: boolean;
}

const TeamCard = ({ member, isPending, role }: TeamCardProps) => {
  const [isAdmin, setIsAdmin] = useState(member.isAdmin);
  const imageUrl =
    member.image && member.image !== "no-image"
      ? member.image
      : "/fallbackimage.png";

  //approve team member
  const handleApproveTeamMember = () => {
    // if (!role) {
    //   toast.error("You must be an admin to approve a team member");
    //   return;
    // }
    approveTeamMember({
      email: member.email,
      name: member.name,
    });
    toast.success(`${member.name} has been approved`);
  };

  //block toggle team member
  const handleToggleBlock = () => {
    // if (!role) {
    //   toast.error("You must be an admin to approve a team member");
    //   return;
    // }
    blockTeamMember({
      email: member.email,
      isBlocked: !member.isBlocked,
    });

    toast.success(
      `${
        member.isBlocked === true
          ? `${member.name}  block removed `
          : `${member.name} blocked`
      }`
    );
  };

  //modal
  const handleEditDeleteModal = (e: React.MouseEvent) => {
    // if (!role) {
    //   e.preventDefault();
    //   toast.error("You must be an admin to edit a team member.");
    // }
  };
  //update role
  const handleUpdateRole = () => {
    updateTeamMember({ email: member.email, isAdmin });
    toast.success(`Role for ${member.name} has been updated`);
  };
  //delete member
  const handleDeleteTeamMember = () => {
    deleteTeamMember({ email: member.email });
    toast.success(`member for ${member.name} has been deleted`);
  };
  return (
    <Card className="dark:bg-tertiary bg-slate-100 flex flex-col justify-between items-center overflow-hidden shadow-md rounded-lg p-4 gap-4 relative">
      <Image
        className="rounded-full"
        src={imageUrl}
        width={100}
        height={100}
        alt={`image of ${member.name}`}
      />
      <h1 className="text-center">{member.name}</h1>
      <div className="absolute right-3 bg-primary px-1 rounded-md text-white">
        {member.role === "admin" ? "Admin" : ""}
      </div>
      <div className="flex items-center gap-2">
        {isPending ? (
          <>
            <Button onClick={handleApproveTeamMember}>Approved</Button>
            <Button onClick={handleToggleBlock} variant={"destructive"}>
              {member.isBlocked ? "Remove Block" : "Block"}
            </Button>
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleEditDeleteModal}>Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Team Member</DialogTitle>
                  <DialogDescription>
                    Update the role of {member.name}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  src={imageUrl}
                  width={50}
                  height={50}
                  alt={`Image of ${member.name}`}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="admin"
                    checked={isAdmin}
                    onCheckedChange={(checked) => setIsAdmin(!!checked)}
                  />
                  <label htmlFor="admin">Admin</label>
                </div>
                <DialogClose>
                  <Button onClick={handleUpdateRole}>Save Changes</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" onClick={handleEditDeleteModal}>
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Block Team Member</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to block {member.name}? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteTeamMember}
                    >
                      Yes, delete
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </Card>
  );
};

export default TeamCard;
