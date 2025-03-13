import { useEffect } from "react";
import { SortingApi } from '../../../src/pages/api/AxiosRequest';
import Pagiantion from "./pagination";
import LoadingPage from "../loadingPage";

const DataTable = ({ loading, fieldName, renderUsersData, Users, recordsPerPage, page, totalPages, onPageChanged, datalenght, totalRecords, onChangeRecordsPerPage,setSorting,sorting,setFilterInput,filterinput ,setPage}) => {
    const perPageArr = [5, 10, 15, 20, 25];
    const isAscSorting = sorting.order === "asc";
    const futureSortingOrder = isAscSorting ? "desc" : "asc";

    const handleChange =async (event) => {
        setPage(1)
        setFilterInput(event.target.value)
    };
    const sortTable = (newSorting) => {
        setSorting(newSorting);
    };
    return (
        <>
            <div id="students_table_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_length" id="students_table_length">
                            <label>
                                <span className="header-text">Show: </span>
                                <select onChange={onChangeRecordsPerPage} className="form-select form-select-sm">
                                    {perPageArr?.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item} </option>
                                        )
                                    })}
                                </select>
                                <span className="header-text"> entries</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div id="students_table_filter" className="dataTables_filter">
                            <label> <span className="header-text">Search : </span>
                                <input
                                    type='search'
                                    className="form-control form-control-sm"
                                    value={filterinput ||''}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="row dt-row">
                    <div className="col-sm-12">
                        <table className="table table-striped table-hover dataTable no-footer" role="grid" aria-describedby="user-list_info">
                            {loading ? <LoadingPage /> : null}
                            <thead>
                                <tr className="heading" role="row">
                                    {fieldName.map((item) => {
                                        return (
                                            <>
                                                <th width="30%" className={`sorting` && sorting.column === item.value && sorting.order === "desc" ? "sorting_desc": 'sorting' && sorting.column === item.value && sorting.order === "asc" ? "sorting_asc":"sorting"}
                                                    onClick={() => sortTable({ column: item.value, order: futureSortingOrder })} key={item.id}>
                                                    {item?.name?.map((filedname) => {
                                                        return filedname
                                                    })}
                                                    {/* {sorting.column === item.value && sorting.order === "desc" && <span>▼</span>}
                                                    {sorting.column === item.value && sorting.order === "asc" && <span>▲</span>} */}
                                                </th>
                                            </>
                                        )
                                    })}
                                    <th width="35%" rowSpan={1} colSpan={1}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users?.length > 0 ? (
                                    <>
                                        {Users &&
                                            Users.map((item, index) => {
                                                return renderUsersData({ item, index })
                                            })
                                        }
                                    </>
                                ) : (
                                    <tr className="odd"><td colSpan="6" className="dataTables_empty"><span className="no-data">No data available in table</span></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagiantion
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    recordsPerPage={recordsPerPage}
                    datalenght={datalenght}
                    currentPage={page}
                    maxVisibleButtons={3}
                    onPageChanged={(e) => onPageChanged(e)}
                />
            </div>
        </>
    )
}
export default DataTable;