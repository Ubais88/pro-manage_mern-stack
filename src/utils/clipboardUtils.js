import toast from "react-hot-toast";

const handleCopyClick = (cardId) => {
  const url = `http://localhost:3000/view/checklist/${cardId}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("Link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy link: ", err);
    });
};

export default handleCopyClick;
