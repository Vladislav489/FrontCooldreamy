import Container from "@/components/Container/Container";
import MainLayout from "@/components/MainLayout/MainLayout";
import Main from "@/pageModules/store-play/components/main/Main";
import { useEffect, useState } from "react";

const StorePage = () => {

  return (
    <Container>
      <MainLayout>
        <Main/>
      </MainLayout>
    </Container>
  )
}

export default StorePage;