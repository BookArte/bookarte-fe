import AdminMember from "@/components/member/AdminMember";
import { useMemberList } from '@/hooks/domain/member/useMemberList';

function AdminMemberPage() {
    return (
        <AdminMember  {...useMemberList()} />
    );
}

export default AdminMemberPage;