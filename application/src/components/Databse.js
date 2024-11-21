// Open (or create) a database
const request = indexedDB.open('myDatabase', 1);

// Handle database upgrades
request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an object store (like a table)
    const objectStore = db.createObjectStore('myObjectStore', { keyPath: 'id' });

    // Create indices (optional)
    objectStore.createIndex('name', 'name', { unique: false });
};

// Handle errors
request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
};

// Handle successful database opening
request.onsuccess = (event) => {
    const db = event.target.result;

    // Now you can use the db instance to perform transactions
    const transaction = db.transaction(['myObjectStore'], 'readwrite');
    const objectStore = transaction.objectStore('myObjectStore');

    // Adding data
    const data = { id: 1, name: 'John Doe' };
    const requestAdd = objectStore.add(data);

    requestAdd.onsuccess = () => {
        console.log('Data added to the database.');
    };

    transaction.oncomplete = () => {
        console.log('Transaction completed.');
    };

    transaction.onerror = (event) => {
        console.error('Transaction error:', event.target.error);
    };
};
