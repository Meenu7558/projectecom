import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";


export const EditProfileForm = ({ setisProfileEdit, initialProfileData }) => {
  // Form for profile details
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialProfileData?.name || "",
      email: initialProfileData?.email || "",
      mobile: initialProfileData?.mobile || "",
    },
  });

  // Form for password change
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    reset: resetPasswordForm,
    formState: { errors: pwdErrors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  // Update profile handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put("/user/profile-update", data);
      toast.success("Profile updated successfully!");
      setisProfileEdit(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // Change password handler
  const onChangePassword = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.put("/user/change-password", data);
      toast.success("Password changed successfully!");
      resetPasswordForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  // Deactivate account handler
  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await axiosInstance.delete("/user/deactivate");
      toast.success("Account deactivated successfully");
      // TODO: Add logout or redirect logic here
    } catch (err) {
      toast.error(err.response?.data?.message || "Account deactivation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Profile Update Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
          Edit Profile
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className={`input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
            className={`input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobile
          </label>
          <input
            type="tel"
            {...register("mobile", {
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid mobile number",
              },
            })}
            placeholder="Enter your mobile number"
            className={`input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              errors.mobile ? "border-red-500" : ""
            }`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-pink-500 text-white hover:bg-pink-600 w-full"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Change Password Form */}
      <form
        onSubmit={handleSubmitPwd(onChangePassword)}
        className="space-y-4"
        noValidate
      >
        <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
          Change Password
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Old Password
          </label>
          <input
            type="password"
            {...registerPwd("oldPassword", {
              required: "Old password is required",
              minLength: {
                value: 6,
                message: "Minimum length is 6 characters",
              },
            })}
            placeholder="Enter your old password"
            className={`input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              pwdErrors.oldPassword ? "border-red-500" : ""
            }`}
          />
          {pwdErrors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {pwdErrors.oldPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            {...registerPwd("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Minimum length is 6 characters",
              },
            })}
            placeholder="Enter your new password"
            className={`input input-bordered w-full mt-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${
              pwdErrors.newPassword ? "border-red-500" : ""
            }`}
          />
          {pwdErrors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {pwdErrors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-pink-500 text-white hover:bg-pink-600 w-full"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Deactivate Account */}
      <div className="text-center">
        <button
          onClick={handleDeactivate}
          disabled={loading}
          className="btn bg-red-600 text-white hover:bg-red-700 w-full"
        >
          {loading ? "Processing..." : "Deactivate Account"}
        </button>
      </div>
    </div>
  );
};
    