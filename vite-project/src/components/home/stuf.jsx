import { NavLink, useLocation, useParams } from 'react-router-dom'
import './homePage.css'
import { useEffect, useState } from 'react';
import { limitRecipeTitle } from '../../utils';



export default function StuffHomePage () {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    const params = useParams();
    const location = useLocation();
    const [staffMembers, setStaffMembers] = useState(
        localStorage.getItem('staffMembers')
            ? JSON.parse(localStorage.getItem('staffMembers'))
            : [
                { id: 1, englishName: 'John Doe', georgianName: 'ჯონ დოუ', role: 'Manager', mobileNumber: '123456789', email: 'john@example.com', isEditing: false },
                { id: 2, englishName: 'Jane Smith', georgianName: 'ჯეინ სმითი', role: 'Waiter', mobileNumber: '987654321', email: 'jane@example.com', isEditing: false }
            ]
    );
    

    // Save data to local storage whenever staff members change
    useEffect(() => {
        localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
    }, [staffMembers]);

    const [newMember, setNewMember] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const isValidEnglishName = (name) => {
        return /^[a-zA-Z\s]+$/.test(name.trim());
    };
    
    const isValidGeorgianName = (name) => {
        return /^[ა-ჰ\s]+$/.test(name.trim());
    };
    
    const isValidRole = (role) => {
        return typeof role === 'string' && role.trim() !== '';
    };
    
    const isValidPhoneNumber = (number) => {
        return /^\d+$/.test(number.trim());
    };
    
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email.trim());
    };
    

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const toggleEdit = (index) => {
        const updatedMembers = staffMembers.map((member, i) => {
            if (i === index) {
                return { ...member, isEditing: !member.isEditing, originalDetails: { ...member } }; // Save original details
            }
            return member;
        });
        setStaffMembers(updatedMembers);
    };
    
    const cancelEdit = (index) => {
        const updatedMembers = staffMembers.map((member, i) => {
            if (i === index) {
                return { ...member.originalDetails, isEditing: false }; // Restore original details and set isEditing to false
            }
            return member;
        });
        setStaffMembers(updatedMembers);
    };
    
    const saveNewMember = () => {
        if (!newMember) return;
    
        const { englishName, georgianName, role, mobileNumber, email } = newMember;
        const errors = [];
    
        if (!isValidEnglishName(englishName)) {
            errors.push('English name must contain only English letters and cannot be empty.');
        }
        if (!isValidGeorgianName(georgianName)) {
            errors.push('Georgian name must contain only Georgian letters and cannot be empty.');
        }
        if (!isValidRole(role)) {
            errors.push('Role must be a non-empty string.');
        }
        if (!isValidPhoneNumber(mobileNumber)) {
            errors.push('Phone number must contain only numbers and cannot be empty.');
        }
        if (!isValidEmail(email)) {
            errors.push('Email must be in a valid format and cannot be empty.');
        }
    
        if (errors.length > 0) {
            // Notify user of validation errors
            alert('Validation failed for the following reasons:\n\n' + errors.join('\n'));
            return;
        }
    
        // Save new member if no validation errors
        const updatedNewMember = { ...newMember, isEditing: false };
        setStaffMembers([...staffMembers, updatedNewMember]);
        setNewMember(null); // Reset newMember state after adding
    };
    

    const saveEdit = (index) => {
        const memberToUpdate = staffMembers[index];
        const { englishName, georgianName, role, mobileNumber, email } = memberToUpdate;
        const errors = [];
    
        if (!isValidEnglishName(englishName)) {
            errors.push('English name must contain only English letters and cannot be empty.');
        }
        if (!isValidGeorgianName(georgianName)) {
            errors.push('Georgian name must contain only Georgian letters and cannot be empty.');
        }
        if (!isValidRole(role)) {
            errors.push('Role must be a non-empty string.');
        }
        if (!isValidPhoneNumber(mobileNumber)) {
            errors.push('Phone number must contain only numbers and cannot be empty.');
        }
        if (!isValidEmail(email)) {
            errors.push('Email must be in a valid format and cannot be empty.');
        }
    
        if (errors.length > 0) {
            // Notify user of validation errors
            alert('Validation failed for the following reasons:\n\n' + errors.join('\n'));
            return;
        }
    
        // Save changes if no validation errors
        const updatedMembers = staffMembers.map((member, i) => {
            if (i === index) {
                return { ...member, isEditing: false, originalDetails: null };
            }
            return member;
        });
        setStaffMembers(updatedMembers);
    };
    
    
    

    const handleInputChange = (field, value, index) => {
        const updatedMembers = staffMembers.map((member, i) => {
            if (i === index) {
                return { ...member, [field]: value };
            }
            return member;
        });
        setStaffMembers(updatedMembers);
    };

    const addStaffMember = () => {
        setNewMember({ id: Date.now(), englishName: '', georgianName: '', role: '', mobileNumber: '', email: '', isEditing: true });
    };

    const cancelAddMember = () => {
        setNewMember(null);
    };

    // const saveNewMember = () => {
    //     if (newMember) {
    //         // Set isEditing to false for the new member
    //         const updatedNewMember = { ...newMember, isEditing: false };
    //         setStaffMembers([...staffMembers, updatedNewMember]);
    //         setNewMember(null); // Reset newMember state after adding
    //     }
    // };
    
    const deleteMember = (index) => {
        const updatedMembers = [...staffMembers];
        updatedMembers.splice(index, 1);
        setStaffMembers(updatedMembers);
      
    };
    
    return (
        <div className={`homePage-container ${isOpenSideBar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <img className='home-paige-logo' src="../../../public/img/Group4.png" alt="" />
            <nav className='side-NavBar'>
            <ion-icon
    style={{
        color: 'white',
        fontSize: isOpenSideBar ? '150%' : '150%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        position: isOpenSideBar ? 'absolute' : 'fixed',
        top: isOpenSideBar ? '-5%' : '3%',
        right: isOpenSideBar ? '0' : 'auto',
        display: isOpenSideBar ? 'initial' : 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    name={isOpenSideBar ? "close-outline" : "list-outline"}
    onClick={() => setIsOpenSideBar(!isOpenSideBar)}
></ion-icon>



<ul> 
            <div className='restaurant-image-name'>
                <div>
                <img className='restaurant-image' src="../../../public/jason-leung-poI7DelFiVA-unsplash.jpg" alt="" />

                </div>
                <div>
                    {
                        isOpenSideBar &&  <span  className='restaurant-name'>მაჭახელა</span >

                    }
                </div>
            </div>
            <NavLink
            key={1}
            className='book3'
            to="/homePage/tables"
            style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => console.log(5)}
        >
            
            <img
                className='homePage-images'
                src={
                    hoveredIndex === 1 || location.pathname === "/homePage/tables"
                        ? "../../../public/homePage/მაგიდებიწ.png"
                        : "../../../public/homePage/მაგიდებით.png"
                }
                alt=""
            />
            {isOpenSideBar ? 'მაგიდების მენეჯმენტი' : null}
        </NavLink>

            <NavLink
                    key={2}
                    className='book3'
                    to="/homePage/menu"
                    style={({ isActive }) => {
                        return isActive ? {
                            backgroundColor: "#D9D9D9",
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            color: '#8C1D2F',
                            fontWeight: '700'
                        } : null
                    }}
                      onMouseEnter={() => handleMouseEnter(2)}
                      onMouseLeave={handleMouseLeave}
                    onClick={() => console.log(5)}
                >
                          <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 2 || location.pathname === "/homePage/menu"
                        ? "../../../public/homePage/მენიუწ.png"
                        : "../../../public/homePage/მენიუთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'მენიუ' : null}

                    
                </NavLink>
            <NavLink
                    key={3}
                    className='book3'
                    to="/homePage/stuff"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                            <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 3 || location.pathname === "/homePage/stuff"
                        ? "../../../public/homePage/სტაფიწ.png"
                        : "../../../public/homePage/სტაფით.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტაფის მენეჯმენტი' : null}

                    
                </NavLink>


            <NavLink
                    key={4}
                    className='book3'
                    to="/homePage/statistics"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(4)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 4 || location.pathname === "/homePage/statistics"
                        ? "../../../public/homePage/სტატისტიკაწ.png"
                        : "../../../public/homePage/სტატისტიკათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'სტატისტიკა' : null}

                    
                </NavLink>


            <NavLink
                    key={5}
                    className='book3'
                    to="/homePage/offers"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 5 || location.pathname === "/homePage/offers"
                        ? "../../../public/homePage/აქციებიწ.png"
                        : "../../../public/homePage/აქციებით.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'აქციები' : null}

                    
                </NavLink>


            <NavLink
                    key={6}
                    className='book3'
                    to="/homePage/discounts"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(6)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 6 || location.pathname === "/homePage/discounts"
                        ? "../../../public/homePage/სეილწ.png"
                        : "../../../public/homePage/სეილთ.png"
                }
                alt="" 
            />
                        {isOpenSideBar ? 'ფასდაკლებები' : null}

                    
                </NavLink>


            <NavLink
                    key={7}
                    className='book3'
                    to="/homePage/distribution"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(7)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 7 || location.pathname === "/homePage/distribution"
                        ? "../../../public/homePage/დისტრწ.png"
                        : "../../../public/homePage/დისტრთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დისტრიბუცია' : null}

                    
                </NavLink>


            <NavLink
                    key={8}
                    className='book3'
                    to="/homePage/myProfile"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(8)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 8 || location.pathname === "/homePage/myProfile"
                        ? "../../../public/homePage/accountw.png"
                        : "../../../public/homePage/accountt.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'ჩემი ანგარიში' : null}

                    
                </NavLink>


            <NavLink
                    key={9}
                    className='book3'
                    to="/homePage/help"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(9)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 9 || location.pathname === "/homePage/help"
                        ? "../../../public/homePage/დახმარებაწ.png"
                        : "../../../public/homePage/დახმარებათ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'დახმარება' : null}

                    
                </NavLink>


            <NavLink
                    key={10}
                    className='book3'
                    to="/homePage/settings"
                    style={({ isActive }) => {
                return isActive ? {
                    backgroundColor: "#D9D9D9",
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    color: '#8C1D2F',
                    fontWeight: '700'
                } : null
            }}
                      onMouseEnter={() => handleMouseEnter(10)}
                      onMouseLeave={handleMouseLeave} 
                    onClick={() => console.log(5)}
                >
                               <img 
                className='homePage-images' 
                src={
                    hoveredIndex === 10 || location.pathname === "/homePage/settings"
                        ? "../../../public/homePage/სეთინგსწ.png"
                        : "../../../public/homePage/სეთინგსთ.png"
                }
                alt="" 
            />
            {isOpenSideBar ? 'პარამეტრები' : null}

                    
                </NavLink>


            </ul>
            <div className='log-out-div'>
                <img className='logout-image' src="../../../public/homePage/გასვლათეთრი.png" alt="" />
                {isOpenSideBar && <span>გამოსვლა</span>}
            </div>
            </nav>

            <div className='content-container'>
                {/* Table for staff management */}
                <div className='table-container'>
                {!newMember && (
    <button className='add-new-member' onClick={addStaffMember} > 
        <ion-icon name="add-outline"></ion-icon>
        თანამშრომლის დამატება
    </button>
)}
                <table>
                    <thead>
                        <tr>
                            <th>{"სახელი (ინგლისურად)"}</th>
                            <th>{"სახელი (ქართულად)"}</th>
                            <th>თანამდებობა</th>
                            <th>ტელ.ნომერი</th>
                            <th>ელ-ფოსტა</th>
                            <th>{"ცვლილება"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffMembers.map((member, index) => (
                            <tr key={index}>
                                <td>
                                    {member.isEditing ? (
                                        <input 
                                        className="staff-input"
                                            type="text"
                                            value={member.englishName}
                                            onChange={(e) => handleInputChange('englishName', e.target.value, index)}
                                        />
                                    ) : (
                                        member.englishName
                                    )}
                                </td>
                                <td>
                                    {member.isEditing ? (
                                        <input 
                                        className="staff-input"
                                            type="text"
                                            value={member.georgianName}
                                            onChange={(e) => handleInputChange('georgianName', e.target.value, index)}
                                        />
                                    ) : (
                                        member.georgianName
                                    )}
                                </td>
                                <td>
                                    {member.isEditing ? (
                                        <input 
                                        className="staff-input"
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => handleInputChange('role', e.target.value, index)}
                                        />
                                    ) : (
                                        member.role
                                    )}
                                </td>
                                <td>
                                    {member.isEditing ? (
                                        <input 
                                        className="staff-input"
                                            type="number"
                                            value={member.mobileNumber}
                                            onChange={(e) => handleInputChange('mobileNumber', e.target.value, index)}
                                        />
                                    ) : (
                                        member.mobileNumber
                                    )}
                                </td>
                                <td>
                                    {member.isEditing ? (
                                        <input 
                                        className="staff-input"
                                            type="email"
                                            value={member.email}
                                            onChange={(e) => handleInputChange('email', e.target.value, index)}
                                        />
                                    ) : (
                                        member.email
                                    )}
                                </td>
                                <td style={{width:'25%'}}>
                                    <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                    {(member.isEditing)? (
                                        <>
                                            <button className="staff-buttons" onClick={() => saveEdit(index)}>                 
                                                <ion-icon name="checkmark-outline"></ion-icon>
                                                შენახვა
                                            </button>
                                            <button className="staff-buttons" onClick={() => cancelEdit(index)}>    
                                                <ion-icon name="close-outline"></ion-icon>
                                                გამოსვლა
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                         <button className="staff-buttons" onClick={() => toggleEdit(index)}>
                                            <ion-icon name="create-outline"></ion-icon>
                                            შეცვლა
                                        </button>
                                        <button className="staff-buttons" onClick={() => deleteMember(index)}>
                <ion-icon name="trash-outline"></ion-icon>
                წაშლა
            </button>
                                        </>
                                       
                                    )}
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                        {(newMember) && (
                            <tr>
                                <td>
                                    <input 
                                    className="staff-input"
                                        type="text"
                                        value={newMember.englishName}
                                        onChange={(e) => setNewMember({ ...newMember, englishName: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input 
                                    className="staff-input"
                                        type="text"
                                        value={newMember.georgianName}
                                        onChange={(e) => setNewMember({ ...newMember, georgianName: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input 
                                    className="staff-input"
                                        type="text"
                                        value={newMember.role}
                                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input 
                                    className="staff-input"
                                        type="number"
                                        value={newMember.mobileNumber}
                                        onChange={(e) => setNewMember({ ...newMember, mobileNumber: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input 
                                    className="staff-input"
                                        type="email"
                                        value={newMember.email}
                                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                    />
                                </td>
                                <td>
                                <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>
                                <button className="staff-buttons" onClick={saveNewMember}>
                                        <ion-icon name="checkmark-outline"></ion-icon>
                                        შენახვა
                                    </button>
                                    <button className="staff-buttons" onClick={cancelAddMember}> 
                                    <ion-icon name="close-outline"></ion-icon>
                                    გამოსვლა</button>
                                </div>
                                   
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                


            </div>
        </div>        
    );
}