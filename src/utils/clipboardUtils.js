import toast from "react-hot-toast";

const handleCopyClick = (cardId) => {
  const url = `https://pro-manage-frontend-zeta.vercel.app/view/checklist/${cardId}`;
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
