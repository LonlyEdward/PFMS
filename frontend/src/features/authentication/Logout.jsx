import { MdOutlineLogout } from "react-icons/md";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <MdOutlineLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
