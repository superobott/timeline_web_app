/**
 * Controls - UI component for timeline settings.
 *
 * Displays a button to toggle timeline sort order (ascending/descending)
 * and a color picker to change the timeline event border color.
 *
 * Props:
 * - sortOrder (string): Current sort order, "asc" or "desc".
 * - onSort (function): Callback to toggle sort order.
 * - color (string): Current color value (hex).
 * - onColorChange (function): Callback to handle color changes.
 */

const Controls = ({ sortOrder, onSort, color, onColorChange }) => (
  <div className="flex items-center justify-center gap-4 mb-4">
    <button
      onClick={onSort}
      className="
        px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold 
        hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md 
        transition
        dark:bg-[#3dd6f3] dark:text-gray-900
        dark:hover:bg-[#0f7389]
      "
    >
      {sortOrder === "asc" ? "Past → Future" : "Future → Past"}
    </button>
    <input
      type="color"
      value={color}
      onChange={onColorChange}
      title="Pick timeline color"
      className="cursor-pointer"
    />
  </div>
);

export default Controls;
