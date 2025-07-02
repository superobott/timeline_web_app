/**
 * ProfileForm component renders a user profile editing form.
 * 
 * Props:
 * - formData: object containing email, newPassword, and confirmPassword fields
 * - handleInputChange: function to update form data on input change
 * - handleSubmit: function called on form submission to save changes
 * - cancelEdit: function to cancel editing and reset the form
 *
 * Features:
 * - Inputs for email and password change (with confirmation)
 * - Responsive layout with accessible labels
 * - Save and Cancel buttons with hover effects
 */

const ProfileForm = ({ formData, handleInputChange, handleSubmit, cancelEdit }) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 rounded-md p-4">
      <label className="font-bold text-[#006A71] w-full sm:w-32 mb-1 sm:mb-0">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="flex-1 w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 rounded-md p-4">
      <label className="font-bold text-[#006A71] w-full sm:w-32 mb-1 sm:mb-0">New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        className="flex-1 w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 rounded-md p-4">
      <label className="font-bold text-[#006A71] w-full sm:w-32 mb-1 sm:mb-0">Confirm New Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className="flex-1 w-full border border-gray-300 rounded-md p-2"
      />
    </div>

    <div className="flex justify-center gap-4 mt-4 flex-wrap">
      <button
        type="submit"
        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
      >
        Save Changes
      </button>
      <button
        type="button"
        onClick={cancelEdit}
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default ProfileForm;
