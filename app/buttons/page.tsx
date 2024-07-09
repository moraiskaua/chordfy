import { Button } from '@/components/ui/button';

const ButtonsPage = () => {
  return (
    <div className="flex flex-col p-4 space-y-4 max-w-[200px]">
      <div className="flex gap-3">
        <Button variant="default">Default</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="danger">Danger</Button>
        <Button variant="dangerOutline">Danger Outline</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="super">Super</Button>
        <Button variant="superOutline">Super Outline</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="sidebar">Sidebar</Button>
        <Button variant="sidebarActive">Sidebar Active</Button>
      </div>
    </div>
  );
};

export default ButtonsPage;
