export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      combinations: {
        Row: {
          combination_id: string;
          created_at: string | null;
          description: string | null;
          difficulty: string | null;
          sequence: string[] | null;
        };
        Insert: {
          combination_id?: string;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string | null;
          sequence?: string[] | null;
        };
        Update: {
          combination_id?: string;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string | null;
          sequence?: string[] | null;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          user_id: string | null;
          workout_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
          workout_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
          workout_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_workout_id_fkey";
            columns: ["workout_id"];
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_saved_workouts: {
        Row: {
          created_at: string;
          id: string;
          user_id: string | null;
          workout_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id?: string;
          workout_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          workout_id?: string;
        };
        WithProfile: {
          created_at: string;
          id: string;
          user_id: string | null;
          workout_id: string;
          profiles: {
            username: string;
          };
        };
        Relationships: [
          {
            foreignKeyName: "user_saved_workouts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_saved_workouts_workout_id_fkey";
            columns: ["workout_id"];
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      user_workout_history: {
        Row: {
          created_at: string;
          id: string;
          user_id: string | null;
          workout_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id?: string;
          workout_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          workout_id?: string;
        };
        WithProfile: {
          created_at: string;
          id: string;
          user_id: string | null;
          workout_id: string;
          profiles: {
            username: string;
          };
        };
        Relationships: [
          {
            foreignKeyName: "user_workout_history_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_workout_history_workout_id_fkey";
            columns: ["workout_id"];
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      workouts: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          is_public: boolean;
          number_of_rounds: number;
          rest_time: number;
          round_info: Json;
          round_time: number;
          title: string;
          user_id: string;
          warmup_time: number;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: string;
          is_public?: boolean;
          number_of_rounds: number;
          rest_time?: number;
          round_info?: Json;
          round_time?: number;
          title?: string;
          user_id?: string;
          warmup_time?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          is_public?: boolean;
          number_of_rounds?: number;
          rest_time?: number;
          round_info?: Json;
          round_time?: number;
          user_id?: string;
          warmup_time?: number;
        };
        WithProfile: {
          created_at: string;
          description: string;
          id: string;
          is_public: boolean;
          number_of_rounds: number;
          rest_time: number;
          round_info: Json;
          round_time: number;
          title: string;
          user_id: string;
          warmup_time: number;
          profiles: {
            username: string;
          };
        };
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      random_combination: {
        Row: {
          combination_id: string | null;
          created_at: string | null;
          description: string | null;
          difficulty: string;
          sequence: string[];
        };
        Insert: {
          combination_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string;
          sequence?: string[];
        };
        Update: {
          combination_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string;
          sequence?: string[];
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
