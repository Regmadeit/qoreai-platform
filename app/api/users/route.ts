import { NextResponse } from "next/server"

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  status: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@qoreai.com",
    role: "operator",
    department: "Operations",
    avatar: "/placeholder.svg?key=tpv3m",
    createdAt: "2022-01-15T08:00:00Z",
    updatedAt: "2023-09-20T14:30:00Z", 
    lastLogin: "2023-10-19T08:45:00Z",
    status: "active"
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    email: "sarah@qoreai.com",
    role: "manager",
    department: "Operations",
    avatar: "/placeholder.svg?key=abc123",
    createdAt: "2022-03-01T09:00:00Z",
    updatedAt: "2023-10-01T11:20:00Z",
    lastLogin: "2023-10-20T09:15:00Z", 
    status: "active"
  }
];

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json(mockUsers);
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedUser = await request.json();
    const user = mockUsers.find(u => u.id === updatedUser.id);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 400 }
    );
  }
}
