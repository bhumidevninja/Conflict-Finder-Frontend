import Chip from "@mui/material/Chip";
import { GridColDef } from "@mui/x-data-grid";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function renderStatus(status: "Approved" | "Pending" | "Rejected") {
  const colors: { [index: string]: "success" | "default" | "error" } = {
    Approved: "success",
    Pending: "default",
    Rejected: "error",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

const renderCommentCount = (count:number = 2) => {
  return (<div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <ChatBubbleOutlineIcon fontSize="small" />
      <span>{count}</span>
  </div>)
}


export const columns: GridColDef[] = [
  { field: "first_name", headerName: "Name", flex: 1.5, minWidth: 100 },
  {
    field: "title",
    headerName: "Project Name",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 300,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "frontend_tech",
    headerName: "Frontend",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "backend_tech",
    headerName: "Backend",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "",
    headerName: "Comments",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => renderCommentCount(params.value as any)
  },
];