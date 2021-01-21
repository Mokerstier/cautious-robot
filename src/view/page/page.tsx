import React from 'react';
import Header from 'src/ui/components/header';

type Props = React.PropsWithChildren<{

}>;

const Page: React.FC<Props> = ({ children }) => (
    <>
        <Header />
        <main>{children}</main>
    </>
);

export default Page;
