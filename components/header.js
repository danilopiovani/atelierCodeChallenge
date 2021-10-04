
/* next */
import Link from 'next/link'
import Image from 'next/image'
import style from '../pages/styles/header.module.scss'
function Header(props) {
    const romanize = (num) => {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
            while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
            }
        }
        return roman;
    }
    return (
        <div className={style.header}>
            <Image loading="eager" width="300" height="300" src={`/assets/logo.png`} alt="logo" />
            {props.breadcrumb === "show" ? 
                <ul className={style.breadcrumb}>
                    <li><Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>Episode {romanize(props.episode_id)}</li>
                </ul>
                :
                ""
            }
        </div>
    )
}

export default Header
