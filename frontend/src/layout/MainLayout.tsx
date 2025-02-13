import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";


const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30} >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="bg-black rounded-lg transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="bg-black rounded-lg transition-colors" />

        {/* Right Sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          Friends Activity
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
export default MainLayout