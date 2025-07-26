
const channel = new BroadcastChannel('sync');
channel.onmessage = async (msg) => {
  if (msg.data === 'updated') {
    await db.load();
  }
};

channel.postMessage('updated');