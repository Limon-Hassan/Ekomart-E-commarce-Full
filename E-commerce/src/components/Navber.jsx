import { useContext, useEffect, useRef, useState } from 'react';
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../socket/SocketContext';
import api from '../Api/axios';
const Navber = () => {
  let [active, setActive] = useState(false);
  let [toggleOpen, setToggleOpen] = useState(false);
  const socket = useContext(SocketContext);
  let [countCart, setCountCart] = useState(0);
  let [search, setSearch] = useState('');
  let [suggestions, setSuggestions] = useState([]);
  let navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    let scrollY = 0;
    const preventTouch = e => {
      const menu = document.getElementById('mobile-menu');
      if (!menu) return;
      if (!menu.contains(e.target)) {
        e.preventDefault();
      }
    };

    if (active) {
      scrollY = window.scrollY || window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';

      document.addEventListener('touchmove', preventTouch, { passive: false });
      document.addEventListener('wheel', preventTouch, { passive: false });
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);
      document.removeEventListener('touchmove', preventTouch);
      document.removeEventListener('wheel', preventTouch);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.removeEventListener('touchmove', preventTouch);
      document.removeEventListener('wheel', preventTouch);
    };
  }, [active]);

  useEffect(() => {
    let updateCart = () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCountCart(cart.length);
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  useEffect(() => {
    const handler = data => {
      if (!search.trim()) return;
      if (
        data.query &&
        data.query.toLowerCase().includes(search.toLowerCase())
      ) {
        setSuggestions(data.suggestions || []);
      } else if (data?.products) {
        setSuggestions(
          data.products
            .map(p => ({
              name: p.name,
              photo: p.photo?.[0] || [],
            }))
            .slice(0, 8)
        );
      }
    };
    socket.on('searchSuggestion', handler);
    return () => socket.off('searchSuggestion', handler);
  }, [socket, search]);

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }
      const userId =
        JSON.parse(localStorage.getItem('auth-Info'))?.user?.id || null;

      socket.emit('searchProducts', { query: value, userId });

      try {
        const res = await api.get('product/product/search', {
          params: { query: value },
        });
        const names = (res.data.products || [])
          .map(p => ({
            name: p.name,
            photo: p.photo?.[0] || [],
          }))
          .slice(0, 8);
        setSuggestions(names);
      } catch (err) {
        console.error('Search request failed:', err);
      }
    }, 200);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('searchResults', data => {
      console.log(data);
      setSuggestions(
        data.products
          .map(p => ({
            name: p.name,
            photo: p.photo?.[0] || [],
          }))
          .slice(0, 8)
      );
    });

    socket.on('searchError', err => {
      console.error('Search error:', err);
    });

    return () => {
      socket.off('searchResults');
      socket.off('searchError');
    };
  }, [socket]);

  const handleSuggestionClick = async s => {
    try {
      const response = await api.get('product/product/search', {
        params: { query: s },
      });

      navigate(`/shop?query=${encodeURIComponent(s)}`, {
        state: response.data,
      });

      setSearch('');
      setSuggestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShow = async () => {
    if (!search.trim()) return;
    let currentSearch = search;
    try {
      const response = await api.get('product/product/search', {
        params: { query: currentSearch },
      });
      navigate(`/shop?query=${encodeURIComponent(currentSearch)}`, {
        state: response.data,
      });
      setSearch('');
      setSuggestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <nav className="bg-white mobile:py-2.5 tablet:py-3.5 laptop:py-5 computer:py-8">
        <Container>
          <div className="computer:flex computer:flex-nowrap mobile:flex mobile:flex-wrap tablet:flex tablet:flex-wrap laptop:flex laptop:flex-nowrap relative justify-between items-center">
            <div className="flex items-center mobile:gap-[15px] tablet:gap-[20px] laptop:gap-[30px] computer:gap-[45px]">
              <button
                onClick={() => setActive(prev => !prev)}
                aria-expanded={active}
                aria-controls="mobile-menu"
                className=" mobile:block tablet:block laptop:hidden computer:hidden tablet:text-[20px] mobile:text-[20px]"
              >
                {active ? (
                  <i class="fa-solid fa-xmark"></i>
                ) : (
                  <i class="fa-solid fa-bars"></i>
                )}
              </button>
              <a href="/">
                <img
                  className="mobile:w-[120px] tablet:w-[130px] laptop:w-auto  computer:w-auto"
                  src="logo-01.svg"
                  alt=""
                />
              </a>
              <div className="computer:flex tablet:hidden laptop:hidden mobile:hidden">
                <div className="text-2xl computer:px-[16px] laptop:px-[10px] py-[8px] border border-[#e2e2e2] rounded-l-[5px]">
                  <i class="fa-thin fa-location-dot"></i>
                </div>
                <div className=" border border-[#e2e2e2] rounded-r-[5px] px-[16px] py-[8px]">
                  <p className="text-[12px] font-display text-[#74787C]">
                    Your location
                  </p>
                  <a
                    className="text-[14px] font-display text-[#2C3C28] font-semibold"
                    href="#"
                  >
                    Select Location
                  </a>
                </div>
              </div>
              <div
                class="relative mobile:hidden tablet:hidden laptop:block computer:block h-[60px]"
                style={{
                  width: '43vw',
                  maxWidth: '645px',
                  minWidth: '300px',
                }}
              >
                <input
                  value={search}
                  onChange={handleSearch}
                  type="search"
                  className="w-full h-full bg-slate-400/20 placeholder:text-slate-400 text-slate-700 placeholder:font-display font-display text-[18px] border border-slate-300 outline-[#629D23] rounded-md pl-3 pr-[115px] py-2 transition duration-300 ease-in-out focus:border-[#629D23] shadow-sm focus:shadow"
                  placeholder="Search for products, categories or brands"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 w-full bg-white border rounded shadow mt-1 z-10">
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSuggestionClick(s.name)}
                      >
                        <i class="fa-light fa-magnifying-glass"></i>
                        <img
                          src={s.photo}
                          alt={s.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className=" text-[16px] truncate font-display laptop:w-[550px] computer:w-[550px]">
                          {s.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={handleShow}
                  className="absolute right-1 top-[50%] rounded font-display font-bold bg-[#629D23] py-[8px] px-[24px] border border-transparent text-center text-[16px] text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none hover:bg-slate-700 ease-in-out duration-300 cursor-pointer  disabled:opacity-50 disabled:shadow-none translate-y-[-50%] "
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex mobile:gap-[10px] tablet:gap-4 laptop:gap-4 computer:gap-5 items-center">
              <a
                href="/account"
                className=" mobile:hidden tablet:block laptop:hidden computer:block tablet:text-[16px] laptop:text-[16px] computer:text-[18px] font-display font-medium border border-[#e2e2e2] rounded-[6px] bg-white hover:bg-[#2C3C28] transition-all ease-in-out duration-300 computer:py-[12px] tablet:py-[12px] laptop:py-[12px] computer:px-[28px] tablet:px-[28px] laptop:px-[28px] text-black hover:text-white cursor-pointer"
              >
                <span className="mr-[8px]">
                  <i class="fa-light fa-user"></i>
                </span>
                Account
              </a>
              <a
                href="/account"
                className="mobile:text-[16px] laptop:text-[18px] mobile:block tablet:hidden laptop:block computer:hidden font-display font-medium border border-[#e2e2e2] rounded-[6px] bg-white hover:bg-[#2C3C28] transition-all ease-in-out duration-300 mobile:py-[10px] laptop:py-[12px] mobile:px-[5px] laptop:px-[28px] text-black hover:text-white cursor-pointer"
              >
                <i class="fa-light fa-user"></i>
              </a>
              <button className="text-[18px] mobile:hidden tablet:hidden laptop:hidden computer:block font-display font-medium border border-[#e2e2e2] rounded-[6px] bg-white hover:bg-[#2C3C28] transition-all ease-in-out duration-300 py-[12px] px-[28px] text-black hover:text-white  cursor-pointer">
                <span className="mr-[8px]">
                  <i class="fa-light fa-heart"></i>
                </span>
                Wishlist
              </button>
              <button className="text-[18px] mobile:hidden tablet:hidden laptop:block computer:hidden font-display font-medium border border-[#e2e2e2] rounded-[6px] bg-white hover:bg-[#2C3C28] transition-all ease-in-out duration-300 py-[12px] px-[28px] text-black hover:text-white cursor-pointer">
                <i class="fa-light fa-heart"></i>
              </button>
              <a
                href="/Cart"
                className="relative mobile:text-[16px] computer:text-[18px] tablet:text-[16px] laptop:text-[16px] font-display font-medium border border-[#e2e2e2] rounded-[6px] bg-white hover:bg-[#2C3C28] transition-all ease-in-out duration-300 mobile:py-[10px] mobile:px-[5px] computer:py-[12px] tablet:py-[12px] laptop:py-[12px] computer:px-[28px] tablet:px-[28px] laptop:px-[28px] text-black hover:text-white cursor-pointer"
              >
                <span className="mr-[8px]">
                  <i class="fa-light fa-cart-shopping"></i>
                </span>
                Cart
                <span className="absolute mobile:top-0 target:top-0 laptop:top-0 computer:top-[4px] mobile:right-[50px] tablet:right-[50px] laptop:right-[55px] computer:right-[62px] bg-[#629D23] text-white rounded-full w-[24px] flex justify-center items-center h-[24px] text-sm ">
                  {countCart}
                </span>
              </a>
            </div>
            <div class="relative  mobile:w-full mobile:h-[50px] tablet:w-full tablet:h-[50px] laptop:hidden computer:hidden mt-2.5">
              <input
                value={search}
                onChange={handleSearch}
                type="search"
                className="w-full h-full bg-slate-400/20 placeholder:text-slate-400 text-slate-700 placeholder:font-display font-display text-[18px] border border-slate-300 outline-[#629D23] rounded-md pl-3 pr-[115px] py-2 transition duration-300 ease-in-out focus:border-[#629D23]  shadow-sm focus:shadow"
                placeholder="Search for products, categories or brands"
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-white border rounded shadow mt-1 z-10">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(s.name)}
                    >
                      <i class="fa-light fa-magnifying-glass"></i>
                      <img
                        src={s.photo}
                        alt={s.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className=" text-[16px] truncate mobile:w-[300px] computer:w-[550px]">
                        {s.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={handleShow}
                className="absolute right-1 top-[50%] rounded font-display font-bold bg-[#629D23] py-[8px] px-[24px] border border-transparent text-center text-[16px] text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none hover:bg-slate-700 ease-in-out duration-300 cursor-pointer  disabled:opacity-50 disabled:shadow-none translate-y-[-50%] "
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </Container>
        {active && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-40"></div>

            <h3
              onClick={() => setActive(false)}
              className="fixed mobile:top-[50px] tablet:top-[80px] laptop:hidden computer:hidden mobile:right-[46px] tablet:right-[165px] text-white text-3xl z-[60]"
            >
              <i class="fa-solid fa-xmark "></i>
            </h3>
          </>
        )}

        <div
          id="mobile-menu"
          className={`fixed top-0 left-0 z-50 mobile:w-[300px] tablet:w-[400px] h-screen bg-white transform origin-left transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden ${
            active ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="bg-[#232f3e] p-[20px]">
            <h3 className="text-right">
              <a href="/login" className=" text-white font-semibold">
                sign in
                <span className="ml-1">
                  <i class="fa-light fa-user"></i>
                </span>
              </a>
            </h3>
            <h3 className="mb-[-12px] text-[20px] font-semibold font-display text-white">
              Welcome
            </h3>
            <span className="text-[35px] font-bold font-display text-white">
              to EKOMART
            </span>
          </div>
          <a
            href="/"
            className="bg-[#232f3e] text-white p-4 flex items-center justify-between border-t-2 border-[#629D23] mb-[2px]"
          >
            EKOMART Home Page
            <span>
              <i className="fa-solid fa-home"></i>
            </span>
          </a>
          <div className="w-full bg-white overflow-hidden">
            <ul className="flex flex-col">
              <li
                aria-expanded={toggleOpen}
                aria-controls="mobile-toggle"
                onClick={() => setToggleOpen(prev => !prev)}
                className="bg-slate-400 text-white p-4 flex items-center justify-between transition-all duration-300"
              >
                <span className="text-[16px] font-medium">Category</span>
                <span
                  className={`transition-transform duration-300 ${
                    toggleOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <i className="fa-solid fa-chevron-up"></i>
                </span>
              </li>
              <ul
                id="mobile-toggle"
                className={`flex flex-col bg-slate-100 transition-all duration-500 ease-in-out overflow-hidden ${
                  toggleOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <li className="p-4 text-slate-800 border-b border-slate-300 hover:bg-slate-200 transition-all duration-200">
                  <span className="mr-1">
                    <i class="fa-thin fa-apple-whole"></i>
                  </span>
                  Fashion
                </li>
                <li className="p-4 text-slate-800 border-b border-slate-300 hover:bg-slate-200 transition-all duration-200">
                  <span className="mr-1">
                    <i class="fa-thin fa-apple-whole"></i>
                  </span>
                  Electronics
                </li>
                <li className="p-4 text-slate-800 border-b border-slate-300 hover:bg-slate-200 transition-all duration-200">
                  <span className="mr-1">
                    <i class="fa-thin fa-apple-whole"></i>
                  </span>
                  Beauty
                </li>
                <li className="p-4 text-slate-800 border-b border-slate-300 hover:bg-slate-200 transition-all duration-200">
                  <span className="mr-1">
                    <i class="fa-thin fa-apple-whole"></i>
                  </span>
                  Home & Living
                </li>
              </ul>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                About Us
              </div>
              <a
                href="/shop"
                className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200"
              >
                Shop
              </a>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Blog
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
              <div className="p-4 bg-slate-400 text-slate-50 font-medium border-t border-slate-200">
                Contact
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;
