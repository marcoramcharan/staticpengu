import { ReactNode } from "react";

interface portfolio {
  template: string;
  name: string;
  surname: string;
  about: string;
  skills: string[];
  hobbies: string[];
  softSkills: string[];
  we: any[];
  edu: any[];
  email: string;
  occupation: string;
  links: { label: string; value: string; type: string }[];
  footer: string;
  navbar: string;
  scroll: boolean;
  font: string;
  cell: string;
  photo: string;
}

interface TemplateProps {
  data: portfolio;
  setPortfolio: any;
  children: ReactNode | undefined;
}

const QuestionPage: React.FC<TemplateProps> = ({
  data,
  setPortfolio,
  children,
}) => {
  console.log(data, setPortfolio);

  return <div className="questions-page">{children}</div>;
};

export default QuestionPage;
