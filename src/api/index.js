
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getFirestore, doc, setDoc, addDoc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import md5 from 'js-md5'

const firebaseConfig =  {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);


const API = {
    signUp(data) {
        return new Promise((resolve, reject) => {
            const email = data.email
            const password = data.password
    
            createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
                const user = userCredential.user

                delete data.password

                setDoc(doc(db, 'users', user.uid), data).then(() => {
                    data.uid = user.uid
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },

    signIn(data) {
        return new Promise((resolve, reject) => {
            const email = data.email
            const password = data.password

            signInWithEmailAndPassword(auth, email, password).then(userCredential => {
                const user = userCredential.user

                getDoc(doc(db, 'users', user.uid)).then(snap => {
                    const data  = snap.data()
                    data.uid = user.uid

                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
             
            }).catch(error => {
                reject(error)
            })
        })
    },

    signOut() {
        return signOut(auth)
    },

    uploadFile(data) {
        return new Promise((resolve, reject) => {

            if(data.startsWith('http')) {
                resolve(data)
                return
            }

            const name = md5(data)
            const storageRef = ref(storage, name);
            uploadString(storageRef, data, 'data_url').then( snap => {
                getDownloadURL(snap.ref).then(url => {
                    resolve(url)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })

    },

    addOrder(data) {
        return new Promise((resolve, reject) => {
            addDoc(collection(db, 'orders'), data).then(item => {
                resolve(item)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getMyOrders(uid) {
        return new Promise((resolve, reject) => {
            const q = query(collection(db, 'orders'), where('uid', '==', uid));
            getDocs(q).then(snap => {
                resolve(snap.docs.map(doc => {
                    const data = doc.data()
                    data.id = doc.id 
                    return data
                }))
            }).catch(error => {
                reject(error)
            })
        })
    },

    saveSpareItem(data, id) {
        return new Promise((resolve, reject) => {
            if (id) {
                updateDoc(doc(db, 'spares', id), data).then(item => {
                    resolve(item)
                }).catch(error => {
                    reject(error)
                })
            }
            else {
                addDoc(collection(db, 'spares'), data).then(item => {
                    resolve(item)
                }).catch(error => {
                    reject(error)
                })
            }
        })
    },

    getUser(uid) {
        return new Promise((resolve, reject) => {
            getDoc(doc(db, 'users', uid)).then(snap => {
                const data  = snap.data()
                data.uid = uid
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getSpare(id) {
        return new Promise((resolve, reject) => {
            getDoc(doc(db, 'spares', id)).then(snap => {
                const data  = snap.data()
                data.id = id

                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getAllSpares(category){
        return new Promise((resolve, reject) => {
            const q = query(collection(db, 'spares'), where('category', '==', category), where('visible', '==', true));
            getDocs(q).then(snap => {
                resolve(snap.docs.map(doc => {
                    const data = doc.data()
                    data.id = doc.id 
                    return data
                }))
            }).catch(error => {
                reject(error)
            })
        })
    },

    getMySpares(uid) {
        return new Promise((resolve, reject) => {
            const q = query(collection(db, 'spares'), where('uid', '==', uid));
            getDocs(q).then(snap => {
                resolve(snap.docs.map(doc => {
                    const data = doc.data()
                    data.id = doc.id 
                    return data
                }))
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default API