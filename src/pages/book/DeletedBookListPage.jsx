import DeletedBookListView from "../../components/book/admin/DeletedBookListView";
import { useDeletedBookManager } from "../../hooks/domain/book/admin/useDeletedBookManager";

function DeletedBookListPage() {
    return <DeletedBookListView {...useDeletedBookManager()} />;
}

export default DeletedBookListPage;