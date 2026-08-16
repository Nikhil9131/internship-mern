import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { 
  Users, 
  Trash2, 
  Edit3, 
  UserPlus, 
  X, 
  CheckCircle, 
  AlertCircle,
  Shield,
  ShoppingBag,
  Clock,
  Mail,
  Lock,
  User as UserIcon
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  
  // States for Admin User Management
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");

  // States for Inquiries
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // States for Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form States (Create User)
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");

  // Form States (Edit User)
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("user");

  // States for User Product Feed
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (user.role === "admin") {
      fetchUsers();
      fetchInquiries();
    } else {
      fetchProducts();
    }
  }, [user]);

  // ================= ADMIN ACTIONS =================

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUserError("");
    try {
      const response = await API.get("/users");
      if (response.data?.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      setUserError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    if (!newName || !newEmail || !newPassword) {
      setUserError("Please fill in all fields");
      return;
    }

    try {
      const response = await API.post("/users/register", {
        name: newName,
        email: newEmail,
        password: newPassword,
      });

      if (response.data?.success) {
        // If the role created is admin, we update the user details
        const createdUser = response.data.user;
        if (newRole === "admin" && createdUser.role !== "admin") {
          // Update the role using the update endpoint
          await API.put(`/users/${createdUser.id}`, { role: "admin" });
        }
        
        setUserSuccess("User created successfully!");
        setIsCreateModalOpen(false);
        // Reset form
        setNewName("");
        setNewEmail("");
        setNewPassword("");
        setNewRole("user");
        fetchUsers();
      }
    } catch (error) {
      setUserError(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleEditClick = (usr) => {
    setSelectedUser(usr);
    setEditName(usr.name);
    setEditEmail(usr.email);
    setEditRole(usr.role);
    setIsEditModalOpen(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    try {
      const response = await API.put(`/users/${selectedUser._id}`, {
        name: editName,
        email: editEmail,
        role: editRole,
      });

      if (response.data?.success) {
        setUserSuccess("User updated successfully!");
        setIsEditModalOpen(false);
        fetchUsers();
      }
    } catch (error) {
      setUserError(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setUserError("");
    setUserSuccess("");

    try {
      const response = await API.delete(`/users/${userId}`);
      if (response.data?.success) {
        setUserSuccess("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      setUserError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const response = await API.get("/inquiries");
      if (response.data?.success) {
        setInquiries(response.data.inquiries || []);
      }
    } catch (error) {
      console.error("Failed to load inquiries:", error);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }
    setUserError("");
    setUserSuccess("");
    try {
      const response = await API.delete(`/inquiries/${inquiryId}`);
      if (response.data?.success) {
        setUserSuccess("Inquiry deleted successfully!");
        fetchInquiries();
      }
    } catch (error) {
      setUserError(error.response?.data?.message || "Failed to delete inquiry");
    }
  };

  // ================= USER ACTIONS =================

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await API.get("/products");
      if (response.data?.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // ================= RENDER DYNAMIC WORKSPACE =================

  const renderAdminDashboard = () => (
    <div className="glass-panel dashboard-card">
      <div className="dashboard-header">
        <div>
          <h2>User Directory</h2>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
            Admin Portal for User Management (CRUD)
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary" 
          style={{ width: "auto" }}
        >
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {userSuccess && (
        <div className="alert alert-success">
          <CheckCircle size={18} />
          <span>{userSuccess}</span>
        </div>
      )}

      {userError && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{userError}</span>
        </div>
      )}

      {loadingUsers ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <span className="spinner"></span>
          <p style={{ marginTop: "1rem", color: "hsl(var(--text-secondary))" }}>Loading user database...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((usr) => (
                <tr key={usr._id}>
                  <td style={{ fontWeight: 600, color: "hsl(var(--text-primary))" }}>{usr.name}</td>
                  <td>{usr.email}</td>
                  <td>
                    <span 
                      className={`user-badge ${usr.role === "admin" ? "admin" : ""}`}
                      style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem" }}
                    >
                      {usr.role}
                    </span>
                  </td>
                  <td>{new Date(usr.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        onClick={() => handleEditClick(usr)}
                        className="btn-icon edit" 
                        title="Edit User"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(usr._id)}
                        className="btn-icon delete" 
                        title="Delete User"
                        disabled={usr._id === user.id} // Prevents deleting self
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                    No users found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Client Advisory Inquiries Log */}
      <div className="glass-panel dashboard-card" style={{ marginTop: "2rem" }}>
        <div className="dashboard-header">
          <div>
            <h2>Client Advisory Inquiries</h2>
            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
              Submitted contact responses from Sol & Sands client portal
            </p>
          </div>
        </div>

        {loadingInquiries ? (
          <div style={{ textAlign: "center", padding: "2.5rem" }}>
            <span className="spinner"></span>
            <p style={{ marginTop: "1rem", color: "hsl(var(--text-secondary))" }}>Loading advisory inquiries...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Client Details</th>
                  <th>Project Profile</th>
                  <th>Message</th>
                  <th>Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--vp-text-white)" }}>{inq.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))" }}>{inq.email}</div>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {inq.projectType.replace("_", " ")}
                    </td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={inq.message}>
                      {inq.message}
                    </td>
                    <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteInquiry(inq._id)}
                        className="btn-icon delete" 
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                      No client inquiries submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Account Info Card */}
      <div className="glass-panel dashboard-card">
        <div className="dashboard-header" style={{ marginBottom: "1rem" }}>
          <div>
            <h2>Welcome back, {user.name}!</h2>
            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
              Here is your account overview
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ background: "hsla(255, 255%, 255%, 0.03)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid hsla(var(--border-light))", display: "flex", gap: "1rem", alignItems: "center" }}>
            <UserIcon size={32} style={{ color: "hsl(var(--accent-primary))" }} />
            <div>
              <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 600 }}>Account Name</p>
              <h4 style={{ fontSize: "1rem" }}>{user.name}</h4>
            </div>
          </div>
          <div style={{ background: "hsla(255, 255%, 255%, 0.03)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid hsla(var(--border-light))", display: "flex", gap: "1rem", alignItems: "center" }}>
            <Mail size={32} style={{ color: "hsl(var(--accent-secondary))" }} />
            <div>
              <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 600 }}>Email</p>
              <h4 style={{ fontSize: "1rem" }}>{user.email}</h4>
            </div>
          </div>
          <div style={{ background: "hsla(255, 255%, 255%, 0.03)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid hsla(var(--border-light))", display: "flex", gap: "1rem", alignItems: "center" }}>
            <Shield size={32} style={{ color: "hsl(var(--success))" }} />
            <div>
              <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", fontWeight: 600 }}>Access Role</p>
              <h4 style={{ fontSize: "1rem" }}>{user.role}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Hospitality Blueprints */}
      <div className="glass-panel dashboard-card">
        <h2>Active Project Blueprints</h2>
        <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Premium development portfolios matching your advisory context
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
          {/* Blueprint 1 */}
          <div className="glass-panel" style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ height: "180px", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <img src="/images/hotel_city.png" alt="City Hotel Blueprint" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--vp-text-white)", margin: 0 }}>City Business Hotel Feasibility</h3>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: "1.5", margin: 0 }}>
                Comprehensive financial viability spreadsheets, zoning FAR details, civil BOQs, and pre-opening operational models for urban hotels.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--vp-accent-purple)" }}>₹55,000</span>
              <span className="user-badge" style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.1)", color: "var(--vp-accent-green)", borderColor: "rgba(16, 185, 129, 0.3)" }}>
                Active Dossier
              </span>
            </div>
          </div>

          {/* Blueprint 2 */}
          <div className="glass-panel" style={{ padding: "1.5rem", background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ height: "180px", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <img src="/images/hotel_resort.png" alt="Resort Hotel Blueprint" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--vp-text-white)", margin: 0 }}>Nature Resort Development Dossier</h3>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: "1.5", margin: 0 }}>
                Eco-resort utility blueprints (STP/solar layouts), landscaping guidelines, wellness spa configurations, and MP Tourism Zone subsidy filings.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1rem" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--vp-accent-purple)" }}>₹75,000</span>
              <span className="user-badge" style={{ padding: "0.2rem 0.6rem", fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.1)", color: "var(--vp-accent-green)", borderColor: "rgba(16, 185, 129, 0.3)" }}>
                Active Dossier
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      {/* Quick Stats Advisory Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(255, 255, 255, 0.02))", border: "1px solid rgba(2, 132, 199, 0.15)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "0.75rem", color: "#0284c7", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>Subsidies Tracked</span>
          <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--vp-text-white)", margin: "0.5rem 0" }}>₹12.5 Cr</h3>
          <span style={{ fontSize: "0.75rem", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>↗ +18% this month</span>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(46, 196, 182, 0.08), rgba(255, 255, 255, 0.02))", border: "1px solid rgba(46, 196, 182, 0.15)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "0.75rem", color: "#2ec4b6", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>Brand Alignments</span>
          <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--vp-text-white)", margin: "0.5rem 0" }}>8 Active</h3>
          <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "4px" }}>2 in negotiation</span>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 0.02))", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>Clearances Pending</span>
          <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--vp-text-white)", margin: "0.5rem 0" }}>14 NOCs</h3>
          <span style={{ fontSize: "0.75rem", color: "#f59e0b", display: "flex", alignItems: "center", gap: "4px" }}>3 near approval</span>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0.02))", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "1.5rem", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>Scheduled Calls</span>
          <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--vp-text-white)", margin: "0.5rem 0" }}>3 Sessions</h3>
          <span style={{ fontSize: "0.75rem", color: "#818cf8", display: "flex", alignItems: "center", gap: "4px" }}>Next tomorrow</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Main Work Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {user.role === "admin" ? renderAdminDashboard() : renderUserDashboard()}
        </div>

        {/* Sidebar Workspace Statistics */}
        <div className="glass-panel dashboard-card" style={{ height: "fit-content" }}>
          <h3>Portal Activity</h3>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Workspace performance logs
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ borderBottom: "1px solid hsla(var(--border-light))", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 500 }}>
                <span>Status</span>
                <span style={{ color: "hsl(var(--success))" }}>Online</span>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid hsla(var(--border-light))", paddingBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 500 }}>
                <span>Authorized Role</span>
                <span style={{ textTransform: "capitalize" }}>{user.role}</span>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem", color: "hsl(var(--text-muted))" }}>
                <Clock size={14} />
                <span>Session started just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button 
              className="modal-close" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="card-header">
              <h2 className="card-title">Add Portal User</h2>
              <p className="card-subtitle">Create a new login credential</p>
            </div>
            
            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="form-input-wrapper">
                  <UserIcon className="form-icon" size={18} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-wrapper">
                  <Mail className="form-icon" size={18} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <Lock className="form-icon" size={18} />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">User Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "1rem" }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button 
              className="modal-close" 
              onClick={() => setIsEditModalOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="card-header">
              <h2 className="card-title">Modify Credentials</h2>
              <p className="card-subtitle">Edit details for {selectedUser?.name}</p>
            </div>
            
            <form onSubmit={handleEditUser}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="form-input-wrapper">
                  <UserIcon className="form-icon" size={18} />
                  <input
                    type="text"
                    className="form-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-wrapper">
                  <Mail className="form-icon" size={18} />
                  <input
                    type="email"
                    className="form-input"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">User Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "1rem" }}
                  disabled={selectedUser?._id === user.id} // Prevent changing own role
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
