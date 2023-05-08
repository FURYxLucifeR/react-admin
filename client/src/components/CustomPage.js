import { DeleteWithConfirmButton, Pagination } from 'react-admin';

const Custompage = users => (
  <Pagination
    rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
    {...users}
  ></Pagination>
);
export default Custompage;
