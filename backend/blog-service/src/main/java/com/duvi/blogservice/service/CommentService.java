package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Comment;
import com.duvi.blogservice.model.dto.CommentDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    Comment createComment(CommentDTO commentDTO);
    List<Comment> getComments();
    Comment getCommentById(Long id);
    Comment updateComment(Long commentId, CommentDTO newCommentDTO);
    void deleteComment(Long id);
}
