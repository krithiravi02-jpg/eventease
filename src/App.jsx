
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import "./App.css";

const events = [
  {
    id: 1,
    name: "Dream Wedding",
    category: "Wedding",
    date: "December 15, 2026",
    location: "Bengaluru",
    price: "₹50,000 onwards",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900",
    description: "Create beautiful memories with our elegant wedding planning services."
  },
  {
    id: 2,
    name: "Birthday Celebration",
    category: "Birthday",
    date: "December 20, 2026",
    location: "Bengaluru",
    price: "₹10,000 onwards",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900",
    description: "Celebrate your special day with wonderful decorations and entertainment."
  },
  {
    id: 3,
    name: "Corporate Events",
    category: "Corporate",
    date: "December 25, 2026",
    location: "Mysuru",
    price: "₹25,000 onwards",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900",
    description: "Professional corporate event planning for memorable business experiences."
  },
  {
    id: 4,
    name: "Music Concert",
    category: "Concert",
    date: "January 10, 2027",
    location: "Bengaluru",
    price: "₹15,000 onwards",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900",
    description: "Enjoy an unforgettable concert with music, lights and entertainment."
  }
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">EventEase.</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <Link to="/events" className="nav-btn">Book Now</Link>
    </nav>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">MAKE EVERY MOMENT SPECIAL</p>
          <h1>Creating Memories<br />That Last Forever.</h1>
          <p>We plan and organize your special occasions with creativity and perfection.</p>
          <Link to="/events" className="primary-btn">Explore Events</Link>
        </div>
      </section>

      <section className="section">
        <h2>Our Services</h2>
        <div className="service-grid">
          <div className="service-card">💍<h3>Weddings</h3></div>
          <div className="service-card">🎂<h3>Birthdays</h3></div>
          <div className="service-card">🏢<h3>Corporate</h3></div>
          <div className="service-card">🎵<h3>Concerts</h3></div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="section page-section">
      <h2>About EventEase</h2>
      <p>EventEase is dedicated to making every celebration memorable. We organize weddings, birthdays, corporate events and concerts.</p>
      <h3>Our Mission</h3>
      <p>To provide creative and memorable event planning experiences.</p>
    </section>
  );
}

function Events() {
  return (
    <section className="section page-section">
      <h2>Explore Our Events</h2>
      <p className="section-desc">Find the perfect event for your special occasion.</p>

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.image} alt={event.name} />
            <div className="event-info">
              <span className="category">{event.category}</span>
              <h3>{event.name}</h3>
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>
              <p className="price">{event.price}</p>
              <Link to={`/event/${event.id}`} className="primary-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventDetails() {
  const { id } = useParams();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return <section className="section"><h2>Event not found</h2><Link to="/events">Back to Events</Link></section>;
  }

  return (
    <section className="section details">
      <img src={event.image} alt={event.name} />
      <div>
        <span className="category">{event.category}</span>
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        <p>📅 {event.date}</p>
        <p>📍 {event.location}</p>
        <h3>{event.price}</h3>
        <Link to={`/book/${event.id}`} className="primary-btn">Book This Event</Link>
      </div>
    </section>
  );
}

function Booking() {
  const { id } = useParams();

  const event = events.find(
    (item) => item.id === Number(id)
  );

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    requirements: ""
  });

  if (!event) {
    return <section className="section"><h2>Event not found</h2></section>;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const booking = {
      ...formData,
      eventName: event.name,
      bookingDate: new Date().toLocaleString()
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("eventBookings") || "[]"
    );

    existingBookings.push(booking);

    localStorage.setItem(
      "eventBookings",
      JSON.stringify(existingBookings)
    );

    setSubmitted(true);
  }

  return (
    <section className="section page-section">
      <h2>Book Your Event</h2>

      <p className="section-desc">
        Complete the form to book {event.name}
      </p>

      {submitted ? (
        <div className="success">
          <h3>🎉 Booking Successful!</h3>
          <p>Thank you, {formData.name}!</p>
          <p>Your booking request for {event.name} has been saved.</p>
          <p>We look forward to making your event special!</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Select Event Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
          />

          <textarea
            name="requirements"
            placeholder="Additional Requirements"
            value={formData.requirements}
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Confirm Booking
          </button>

        </form>
      )}
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section page-section">
      <h2>Contact Us</h2>
      <p className="section-desc">We would love to hear from you!</p>

      {sent ? (
        <div className="success">Thank you for contacting us!</div>
      ) : (
        <form className="contact-form" onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit" className="primary-btn">Send Message</button>
        </form>
      )}
    </section>
  );
}


function Admin() {
  const [bookings, setBookings] = useState(() => {
    return JSON.parse(
      localStorage.getItem("eventBookings") || "[]"
    );
  });

  function deleteBooking(index) {
    const updatedBookings = bookings.filter(
      (_, i) => i !== index
    );

    setBookings(updatedBookings);

    localStorage.setItem(
      "eventBookings",
      JSON.stringify(updatedBookings)
    );
  }

  return (
    <section className="section page-section">
      <h2>Admin Dashboard</h2>
      <p className="section-desc">
        Manage all customer event bookings.
      </p>

      <div className="admin-stats">
        <div className="admin-stat">
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="admin-stat">
          <h3>
            {bookings.reduce(
              (total, booking) =>
                total + Number(booking.guests || 0), 0
            )}
          </h3>
          <p>Total Guests</p>
        </div>
      </div>

      <h2>Customer Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.eventName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.guests}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteBooking(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <h2>EventEase.</h2>
      <p>Making every celebration unforgettable.</p>
      <p>© 2026 EventEase. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;