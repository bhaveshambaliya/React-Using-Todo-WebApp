import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDatils, setuserDatils] = useState();
  const [totalItem, settotalItem] = useState(1);
  const [updateUid, setupdateUid] = useState("");
  const [AddProducts, setAddProducts] = useState(0);

  if (currentUser != null) {
    const Query = db
      .collection("PurchaseProduct")
      .where("currentUserUid", "==", currentUser.uid);
    Query.get().then(function (querySnapshot) {
      if (querySnapshot) {
        setAddProducts(querySnapshot.docs.length);
      }
    });
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function AddNewProduct(ID) {
    let ProductData = {
      currentUserUid: currentUser.uid,
      productuid: ID,
      totalItem: 1,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const Query = db
      .collection("PurchaseProduct")
      .where("productuid", "==", ID)
      .where("currentUserUid", "==", currentUser.uid);

    Query.get().then(function (querySnapshot) {
      if (querySnapshot.empty) {
        db.collection("PurchaseProduct").add(ProductData);
      } else {
        querySnapshot.docs.map((doc) => {
          db.collection("PurchaseProduct")
            .doc(doc.id)
            .update({ totalItem: doc.data().totalItem + 1 });
        });
      }
    });
    setAddProducts(AddProducts + 1);
    toast.success("Add Product Successfully");
    return AddProducts;
  }
  function RemoveProduct() {
    setAddProducts(AddProducts - 1);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [AddProducts]);

  const value = {
    userDatils,
    currentUser,
    AddProducts,
    RemoveProduct,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    AddNewProduct,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
