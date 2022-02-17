import get from "lodash.get";
import { toast } from "react-toastify";

export { errorHandler };

function errorHandler(err, res) {
  if (get(res, "code") === 500) {
    toast.error(res.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }

  if (get(res, "code") >= 400) {
    toast.error(res.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  if (typeof err === "string") {
    // custom application error
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  // default to 500 server error
  return res.status(500).json({ message: err });
}
