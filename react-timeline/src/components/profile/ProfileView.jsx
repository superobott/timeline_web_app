/**
 * ProfileView component displays the user's email with options to edit profile or return.
 * 
 * Props:
 * - email: user's email address (string)
 * - onEdit: callback to trigger editing mode
 * - onReturn: callback to navigate back to the choose page
 *
 * Features:
 * - Responsive layout with clear labeling
 * - Two action buttons with consistent styling and hover effects
 */

const ProfileView = ({ email, onEdit, onReturn }) => {
  return (
    <>
      <div className="mt-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 rounded-md p-4 mb-4">
          <label className="font-bold text-[#006A71] w-full sm:w-32 mb-1 sm:mb-0">Email:</label>
          <span className="flex-1 break-all">{email}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={onEdit}
          className="
              px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
              bg-[#006A71] text-white
              dark:bg-[#3dd6f3] dark:text-gray-900
              hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
              >
          Edit Profile
        </button>
        <button
          onClick={onReturn}
          className="
            px-5 py-2 rounded font-semibold text-base cursor-pointer transition-all duration-300
            bg-[#006A71] text-white
            dark:bg-[#3dd6f3] dark:text-gray-900
            hover:bg-[#6db3b7] dark:hover:bg-[#0f7389]"
        >
          Return to Choose
        </button>
      </div>
    </>
  );
};

export default ProfileView;
