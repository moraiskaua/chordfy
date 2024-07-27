import { ReactNode } from 'react';

interface LessonLayoutProps {
  children: ReactNode;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
};

export default LessonLayout;
