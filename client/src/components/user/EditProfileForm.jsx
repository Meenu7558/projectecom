import React from "react";
import { useForm } from "react-hook-form";

export const EditProfileForm = ({ setisProfileEdit, initialProfileData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initialProfileData?.name,
      email: initialProfileData?.email,
      mobile: initialProfileData?.mobile,
    },
  });

  const onSubmit = async (data) => {
    console.log("Updated Profile:", data);
    // Logic to update the profile
    // After successful update, close the edit form
    setisProfileEdit(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter your name"
          className="input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
        <input
          type="tel"
          {...register("mobile")}
          placeholder="Enter your mobile"
          className="input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="btn bg-pink-500 text-white hover:bg-pink-600"
      >
        Save Changes
      </button>
    </form>
  );
};
