import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

export default function CustomEditor({ value, setValue, name, disable }) {
  return (
    <div className="my-2">
      <b>{name}</b>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="text-editor-custom"
        readOnly={disable}
      />
    </div>
  );
}
