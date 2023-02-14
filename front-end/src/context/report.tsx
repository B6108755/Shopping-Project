import { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext<any>({});

const ReportProvider = ({ children }: { children: JSX.Element }) => {
  const [report, setReport] = useState<any[]>();
  return (
    <ReportContext.Provider value={{ report, setReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);
export default ReportProvider;
