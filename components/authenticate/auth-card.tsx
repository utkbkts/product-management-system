import Logo from "../header/logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BackButton from "./back-button";

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
};

const AuthCard = ({
  children,
  title,
  backButtonHref,
  backButtonLabel,
}: AuthCardProps) => {
  return (
    <Card className="w-[400px]">
      <CardHeader className="items-center gap-5">
        <Logo />
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
