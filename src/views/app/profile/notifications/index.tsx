import React, { Suspense } from 'react';
const Notifications = (props:any) => (
  <Suspense fallback={<div className="loading" />}>
    <p>Her vil man kunne komme til at ændre notifikationsindstillinger i fremtiden.</p>
  </Suspense>
);
export default Notifications;
