"use client";

import { useAppSelector } from "@/src/redux/hooks";
import styles from "./EditProfileDialog.module.scss";
import { IoClose } from "react-icons/io5";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import editProfile from "@/src/lib/services/profile/editProfile";

type Proptypes = {
  fullName: string;
  username: string;
  setShowDialog: React.Dispatch<SetStateAction<boolean>>;
};

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(6, "Password must be at least 6 characters"),
});

type TypeEditProfileSchema = z.infer<typeof editProfileSchema>;

export default function EditProfileDialog({ fullName, username, setShowDialog }: Proptypes) {
  const [serverMsg, setServerMsg] = useState("");
  const { userID } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const handleEditProfile = async (data: TypeEditProfileSchema) => {
    const { name, username } = data;
    const res = await editProfile(name, username, userID);

    if (res.success) {
      setShowDialog((prev) => !prev);
    }

    setServerMsg(res.message);
  };

  return (
    <div className={styles.dialog}>
      <form onSubmit={handleSubmit(handleEditProfile)} className={styles.form} action="">
        <button
          type="button"
          onClick={() => setShowDialog((prev) => !prev)}
          className={styles.close}
        >
          <IoClose size={25} />
        </button>

        <div className={styles.formHeader}>
          <h1>Edit profile</h1>
          <p>Make changes to your profile here. Click save when you're done.</p>
        </div>

        <div className={styles.formInputs}>
          <label htmlFor="name">Name</label>
          <input {...register("name")} name="name" type="text" placeholder={fullName} />
          <label htmlFor="username">Username</label>
          <input {...register("username")} name="username" type="text" placeholder={username} />
          {errors.name && (
            <p style={{ color: "var(--accent-color-red)" }}>{`${errors.name.message}`}</p>
          )}
          {errors.username && (
            <p style={{ color: "var(--accent-color-red)" }}>{`${errors.username.message}`}</p>
          )}
        </div>

        <button type="submit" className="btnPrimary">
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
