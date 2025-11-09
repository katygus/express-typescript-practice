import React, { useState } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  // User management functions
  const addUser = async () => {
    const name = document.getElementById('userName')?.value
    const email = document.getElementById('userEmail')?.value
    
    if (!name || !email) {
      setStatus('Please fill in both name and email')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setStatus('User added successfully!')
        // Clear form
        document.getElementById('userName').value = ''
        document.getElementById('userEmail').value = ''
        // Refresh users list
        getUsers()
      } else {
        setStatus(`Error: ${result.error || 'Failed to add user'}`)
      }
    } catch (error) {
      setStatus('Error: Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const result = await response.json()
      
      if (response.ok) {
        setUsers(result.data || [])
        setStatus('Users loaded successfully!')
      } else {
        setStatus(`Error: ${result.error || 'Failed to load users'}`)
      }
    } catch (error) {
      setStatus('Error: Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  // Product management functions
  const addProduct = async () => {
    const name = document.getElementById('productName')?.value
    const price = document.getElementById('productPrice')?.value
    const category = document.getElementById('productCategory')?.value
    
    if (!name || !price || !category) {
      setStatus('Please fill in all product fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          price: parseFloat(price),
          category 
        }),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setStatus('Product added successfully!')
        // Clear form
        document.getElementById('productName').value = ''
        document.getElementById('productPrice').value = ''
        document.getElementById('productCategory').value = ''
        // Refresh products list
        getProducts()
      } else {
        setStatus(`Error: ${result.error || 'Failed to add product'}`)
      }
    } catch (error) {
      setStatus('Error: Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products')
      const result = await response.json()
      
      if (response.ok) {
        setProducts(result.data || [])
        setStatus('Products loaded successfully!')
      } else {
        setStatus(`Error: ${result.error || 'Failed to load products'}`)
      }
    } catch (error) {
      setStatus('Error: Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  // Test server connection
  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/status')
      const result = await response.json()
      
      if (response.ok) {
        setStatus(`Server Status: ${result.message}`)
      } else {
        setStatus(`Error: ${result.error || 'Server not responding'}`)
      }
    } catch (error) {
      setStatus('Error: Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Express.js Practice Dashboard</h1>
      
      <div className="section">
        <h2>Server Status</h2>
        <button onClick={testAPI} disabled={loading}>
          Test Server Connection
        </button>
      </div>
      
      <div className="section">
        <h2>Users Management</h2>
        <div className="form-group">
          <input 
            type="text" 
            id="userName" 
            placeholder="Enter user name"
            disabled={loading}
          />
          <input 
            type="email" 
            id="userEmail" 
            placeholder="Enter user email"
            disabled={loading}
          />
          <button onClick={addUser} disabled={loading}>
            Add User
          </button>
        </div>
        <button onClick={getUsers} disabled={loading}>
          Get All Users
        </button>
        
        <div className="data-display">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className="user-item">
                <strong>{user.name}</strong> - {user.email}
              </div>
            ))
          ) : (
            <div>No users to display</div>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Products Management</h2>
        <div className="form-group">
          <input 
            type="text" 
            id="productName" 
            placeholder="Enter product name"
            disabled={loading}
          />
          <input 
            type="number" 
            id="productPrice" 
            placeholder="Enter price"
            step="0.01"
            disabled={loading}
          />
          <input 
            type="text" 
            id="productCategory" 
            placeholder="Enter category"
            disabled={loading}
          />
          <button onClick={addProduct} disabled={loading}>
            Add Product
          </button>
        </div>
        <button onClick={getProducts} disabled={loading}>
          Get All Products
        </button>
        
        <div className="data-display">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-item">
                <strong>{product.name}</strong> - ${product.price} ({product.category})
              </div>
            ))
          ) : (
            <div>No products to display</div>
          )}
        </div>
      </div>

      {status && (
        <div className={`status-message ${
          status.includes('Error') ? 'status-error' : 'status-success'
        }`}>
          {status}
        </div>
      )}
    </div>
  )
}

export default App