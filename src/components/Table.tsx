/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { TRows } from './App';
import Button from './Button';
import { tdRowsCSS, thHeadCSS } from './Table.styles';

type TAppProps = {
    headings: string[];
    rows: TRows[][];
};

const Table = ({ headings, rows }: TAppProps): JSX.Element => {
    return (
        <table>
            <thead>
                <tr>
                    {headings.map((heading) => {
                        return (
                            <th key={heading} css={thHeadCSS(heading)}>
                                {heading}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.length ? (
                    rows.map((row) => {
                        return (
                            <tr key={row.join('-')}>
                                {row.map((item, i) => {
                                    const productId = row[0];
                                    return (
                                        <td
                                            key={item.toString()}
                                            css={tdRowsCSS(i)}
                                        >
                                            {i === row.length - 1 ? (
                                                row[i] ? (
                                                    <Link
                                                        to={`/edit-product/${productId}`}
                                                    >
                                                        <Button title="Edit" />
                                                    </Link>
                                                ) : (
                                                    ''
                                                )
                                            ) : (
                                                item.toString()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={5}>Loading...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
