import Header from "@components/common/header/index";

const BasicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default BasicLayout;
