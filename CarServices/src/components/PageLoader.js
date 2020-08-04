import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function PageLoader() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default PageLoader;
