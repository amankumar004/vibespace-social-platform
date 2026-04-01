import MainLayout from "../components/ui/MainLayout";

const NotificationsPage = () => {
  const right = null;

  return (
    <MainLayout rightChildren={right}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Notifications</h2>
      </div>

      <div className="space-y-4 text-gray-300">
        <div className="bg-white/5 rounded-xl p-4">No new notifications</div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
