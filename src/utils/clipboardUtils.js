import toast from "react-hot-toast";


const handleShareClick = (shareQuizId) => {
  
  const url = `https://quizzie-frontend.vercel.app/playquiz/${shareQuizId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };
  
  export default handleShareClick;
  